import { bindProgram, bindBuffer } from './context-utils.mjs';
import { bindProgramAttributes, bindProgramUniforms } from './program.mjs';

export function createDrawObject(gl, attributes = {}, indices = null) {
  return {
    first: 0,
    mode: 0,
    count: 0,
    offset: 0,
    attributes,
    indices,
  };
}

export function draw(gl, program, object) {
  if (!program.ok) return false;

  const { attributes, indices } = object;

  bindProgram(gl, program);
  bindProgramAttributes(gl, program, attributes);
  bindProgramUniforms(gl, program);

  if (indices) {
    bindBuffer(indices);
    gl.drawElements(object.mode, object.count, object.type, object.offset);
  } else {
    gl.drawArrays(object.mode, object.first, object.count);
  }

  return true;
}

export function drawFullQuad(gl, program) {

}

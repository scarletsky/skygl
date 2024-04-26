import { createBuffer } from './buffer.mjs';
import { ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, TRIANGLES } from './constants.mjs';
import { bindProgram, bindBuffer } from './context-utils.mjs';
import { bindProgramVertexAttribs, bindProgramUniforms } from './program.mjs';

export function createDrawObject(gl, attributes = {}, indices = null, options = {}) {
  let newIndices = null;
  const newAttributes = {};

  for (let attr in attributes) {
    const data = attributes[attr];
    const buffer = createBuffer(gl, ARRAY_BUFFER, data);
    newAttributes[attr] = buffer;
  }

  if (indices) {
    newIndices = createBuffer(gl, ELEMENT_ARRAY_BUFFER, indices);
  }

  return {
    first: options.first || 0,
    mode: options.mode || TRIANGLES,
    count: options.count || 0,
    offset: options.offset || 0,
    vertexAttribs: newAttributes,
    vertexArray: null,
    indices: newIndices,
  };
}

export function draw(gl, program, object) {
  if (!program.ok) return false;

  const {
    mode,
    // NOTE: for `gl.drawArrays`,
    first, count,
    // NOTE: for `gl.drawElements`,
    type, offset,
    vertexAttribs,
    vertexArray,
    indices,
  } = object;

  bindProgram(gl, program);
  bindProgramVertexAttribs(gl, program, vertexAttribs);
  bindProgramUniforms(gl, program);

  if (indices) {
    bindBuffer(indices);
    gl.drawElements(mode, indices.count, type, offset);
  } else {
    gl.drawArrays(mode, first, count);
  }

  return true;
}

export function drawFullQuad(gl, program) {

}

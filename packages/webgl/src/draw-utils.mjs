import { createBuffer } from './buffer.mjs';
import { ELEMENT_ARRAY_BUFFER, TRIANGLES } from './constants.mjs';
import { bindProgram, bindBuffer } from './context-utils.mjs';
import { bindProgramVertexAttribs, bindProgramUniforms } from './program.mjs';
import { createVertexAttrib } from './vertex-attrib-utils.mjs';

export function createDrawObject(gl, attributes = {}, indices = null, options = {}) {
  let newIndices = null;
  const newAttributes = {};

  for (let attr in attributes) {
    const data = attributes[attr];
    const attrib = createVertexAttrib(gl, data);
    newAttributes[attrib.name] = attrib;
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
    type, offset, indices,
    vertexAttribs,
    vertexArray,
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

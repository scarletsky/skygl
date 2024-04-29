import { createBuffer } from './buffer.mjs';
import { ELEMENT_ARRAY_BUFFER, TRIANGLES } from './constants.mjs';
import { bindProgram, bindBuffer } from './context-utils.mjs';
import { bindProgramVertexAttribs, bindProgramUniforms, bindProgramVertexArray } from './program.mjs';
import { createVertexArray } from './vertex-array-utils.mjs';
import { createVertexAttrib } from './vertex-attrib-utils.mjs';

export function createDrawObject(gl, attributes = {}, indices = null, options = {}) {
  let newIndices = null;
  const newAttributes = {};

  for (let attr in attributes) {
    const data = attributes[attr];

    if (!data.name) {
      data.name = attr;
    }

    const attrib = createVertexAttrib(gl, data);
    newAttributes[attrib.name] = attrib;
  }

  if (indices) {
    newIndices = createBuffer(gl, ELEMENT_ARRAY_BUFFER, indices);
  }

  return {
    mode: options.mode || TRIANGLES,
    // NOTE: for `gl.drawArrays`,
    first: options.first || 0,
    count: options.count || 0,
    // NOTE: for `gl.drawElements`,
    offset: options.offset || 0,
    indices: newIndices,
    vertexAttribs: newAttributes,
    vertexArray: null,
  };
}

export function draw(gl, program, object, options = {}) {
  if (!program.ok) return false;

  const {
    mode,
    // NOTE: for `gl.drawArrays`,
    first, count,
    // NOTE: for `gl.drawElements`,
    type, offset, indices,
    vertexAttribs,
  } = object;

  bindProgram(gl, program);

  if (options.tryVertexArray) {

    if (!object.vertexArray) {
      object.vertexArray = createVertexArray(gl);
    }

    const { vertexArray } = object;

    if (vertexArray.glVertexArray) {
      bindProgramVertexArray(gl, program, vertexArray, vertexAttribs);
    } else {
      bindProgramVertexAttribs(gl, program, vertexAttribs);
    }

  } else {
    bindProgramVertexAttribs(gl, program, vertexAttribs);
  }

  bindProgramUniforms(gl, program);

  if (indices) {
    bindBuffer(indices);
    gl.drawElements(mode, indices.count, type, offset);
  } else {
    gl.drawArrays(mode, first, count);
  }

  return true;
}


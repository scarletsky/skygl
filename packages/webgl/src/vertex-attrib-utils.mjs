import { createBuffer } from './buffer.mjs';
import { ARRAY_BUFFER, BYTE, FLOAT, INT, SHORT, UNSIGNED_BYTE, UNSIGNED_INT, UNSIGNED_SHORT } from './constants.mjs';

export function createVertexAttrib(gl, data) {
  const { name } = data;
  const offset = data.offset || 0;
  const stride = data.stride || 0;
  const normalized = data.normalized || false;
  const numComponents = getVertexAttribNumComponents(data);
  const type = getVertexAttribType(data);
  const buffer = createBuffer(gl, { target: ARRAY_BUFFER, data: data.data });

  return {
    name,
    numComponents, type,
    offset, stride, normalized,
    buffer,
  };
}

export function getVertexAttribType(data) {
  if (data.type) return data.type;

  const d = data.data;
  if (ArrayBuffer.isView(d)) {
    if (d instanceof Float32Array) return FLOAT;
    if (d instanceof Uint16Array) return UNSIGNED_SHORT;
    if (d instanceof Uint32Array) return UNSIGNED_INT;
    if (d instanceof Uint8Array) return UNSIGNED_BYTE;
    if (d instanceof Int16Array) return SHORT;
    if (d instanceof Int32Array) return INT;
    if (d instanceof Int8Array) return BYTE;
  } else if (Array.isArray(d)) {
    return FLOAT;
  }
}

export function getVertexAttribNumComponents(data) {
  return data.numComponents || data.size;
}

import { STATIC_DRAW } from './constants.mjs';
import { bindBuffer } from './context-utils.mjs';
import {
  createGLBuffer,
  getGLBufferParameter,
  setGLBufferData,
  setGLBufferSubData
} from './buffer-utils.mjs';

export class Buffer {
  constructor(options = {}) {
    this.gl = options.gl || null;
    this.target = options.target;
    this.usage = options.usage || STATIC_DRAW;
    this.data = null;
    this.byteLength = options.byteLength || 0;
    this.interleaved = null;
    this.glBuffer = null;

    setBufferData(this.gl, this, options.data);
  }

  setData(data) {
    return setBufferData(this.gl, this, data);
  }
}

Buffer.prototype.isBuffer = true;

export function createBuffer(gl, target, data, options = {}) {
  return new Buffer({ gl, target, data, ...options });
}

export function deleteBuffer(gl, buffer) {
  if (!buffer.glBuffer) return false;

  gl.deleteBuffer(buffer.glBuffer);
  buffer.glBuffer = null;

  return true;
}

export function setBufferData(gl, buffer, data) {
  if (buffer.data !== data) buffer.data = data;

  if (!buffer.glBuffer) {
    buffer.glBuffer = createGLBuffer(gl);
  }

  bindBuffer(gl, buffer);
  setGLBufferData(gl, buffer.glBuffer, buffer.target, (buffer.data || buffer.byteLength), buffer.usage, false);

  return true;
}

export function setBufferSubData(_gl, buffer, offset, data) {
  if (!buffer.glBuffer) {
    buffer.glBuffer = createGLBuffer(gl);
  }

  bindBuffer(gl, buffer);
  setGLBufferSubData(gl, buffer.glBuffer, buffer.target, offset, data, false);

  return true;
}

export function getBufferParameter(gl, buffer, pname) {
  bindBuffer(gl, buffer);
  const parameter = getGLBufferParameter(gl, buffer.glBuffer, buffer.target, pname, false);
  bindBuffer(gl, null);
  return parameter;
}

export function toInterleavedBuffer(buffers) {

}

export function toSeparateBuffers(interleavedBuffer) {

}

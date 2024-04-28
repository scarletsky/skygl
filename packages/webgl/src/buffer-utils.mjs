import { STATIC_DRAW } from './constants.mjs';

export function createGLBuffer(gl) {
  return gl.createBuffer();
}

export function setGLBufferData(gl, glBuffer, target, dataOrSize, usage = STATIC_DRAW, shouldBindBuffer = true) {
  if (shouldBindBuffer) gl.bindBuffer(target, glBuffer);
  gl.bufferData(target, dataOrSize, usage);
  return glBuffer;
}

export function setGLBufferSubData(gl, glBuffer, target, offset, data, shouldBindBuffer = true) {
  if (shouldBindBuffer) gl.bindBuffer(target, glBuffer);
  gl.bufferSubData(target, offset, data)
  return glBuffer;
}

export function getGLBufferParameter(gl, glBuffer, target, pname, shouldBindBuffer = true) {
  if (shouldBindBuffer) gl.bindBuffer(target, glBuffer);
  return gl.getBufferParameter(target, pname);
}

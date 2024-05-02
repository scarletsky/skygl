import { isWebGL2 } from './utils.mjs';

export function createVertexArray(gl) {

  let glVertexArray = null;

  if (isWebGL2(gl)) {
    glVertexArray = gl.createVertexArray();
  } else if (gl.extVertexArrayObject) {
    glVertexArray = gl.extVertexArrayObject.createVertexArrayOES();
  }

  return {
    ok: false,
    glVertexArray
  };
}

export function deleteVertexArray(gl, vertexArray) {
  if (!vertexArray.glVertexArray) return false;

  if (isWebGL2(gl)) {
    gl.deleteVertexArray(vertexArray.glVertexArray);
  } else if (gl.extVertexArrayObject) {
    gl.extVertexArrayObject.deleteVertexArrayOES(vertexArray.glVertexArray);
  }

  vertexArray.glVertexArray = null;
  vertexArray.ok = false;

  return true;
}

import { createDrawObject, draw } from './draw-utils.mjs';

let fullQuad = null;

export function getFullQuad(gl) {
  if (!fullQuad) {
    fullQuad = createFullQuad(gl);
  }

  return fullQuad;
}

export function createFullQuad(gl) {
  return createDrawObject(gl, {
    POSITION: {
      name: 'POSITION',
      numComponents: 2,
      data: new Uint8Array([0, 0, 2, 0, 0, 2])
    }
  }, null, { count: 3 });
}

export function deleteFullQuad(gl) {
  if (!fullQuad) return false;

  fullQuad = null;

  return true;
}

export function drawFullQuad(gl, program) {
  return draw(gl, program, getFullQuad(gl));
}

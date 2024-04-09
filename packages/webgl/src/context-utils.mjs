import { getExtensions } from './extension-utils.mjs';

export const glState = {
  // NOTE: WebGL1 state
  clearColor: [0, 0, 0, 1],
  clearDepth: 1,
  clearStencil: 0,
  blend: false,
  blendFunc: [0, 0],
  blendEquation: 0,
  blendEquationSeparate: [0, 0],
  blendColor: [0, 0, 0, 0],
  colorMask: [true, true, true, true],
  frontFace: 0,
  cullFace: false,
  cullFaceMode: 0,
  depthTest: false,
  depthMask: false,
  depthFunc: 0,
  depthRange: [0, 1],
  stencilTest: false,
  stencilFunc: [false, false, false],
  stencilMask: 0xFF,
  stencilOp: [0, 0, 0],
  scissorTest: false,
  scissor: [0, 0, 300, 150],
  viewport: [0, 0, 300, 150],

  packAlignment: 4,
  unpackAlignment: 4,
  unpackFlipY: false,
  unpackPremultiplyAlpha: false,
  unpackColorSpaceConversion: false,
  // NOTE: caps
};

export function getContext(canvas, tryWebGL2 = true, options = {}) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Invalid HTMLCanvasElement.');
  }

  let gl = null;

  if (tryWebGL2) {
    gl = canvas.getContext('webgl2', options);
    gl.isWebGL2 = true;
  } else {
    gl = canvas.getContext('webgl', options);
    gl.isWebGL2 = false;
  }

  getExtensions(gl);

  return gl;
}

export function isWebGL2(gl) {
  if (gl.isWebGL2) return true;
  if (gl.isWebGL2 === undefined) {
    gl.isWebGL2 = !!gl.texStorage2D;
  }
  return gl.isWebGL2;
}

export function setClearColor(gl, v) {
  const { clearColor } = glState;

  if (clearColor[0] === v[0] &&
    clearColor[1] === v[1] &&
    clearColor[2] === v[2] &&
    clearColor[3] === v[3]) {
    return false;
  }
  gl.clearColor(v[0], v[1], v[2], v[3]);

  clearColor[0] = v[0];
  clearColor[1] = v[1];
  clearColor[2] = v[2];
  clearColor[3] = v[3];

  return true;
}

export function setClearDepth(gl, v) {
  if (glState.clearDepth === v) return false;
  gl.clearDepth(v);
  glState.clearDepth = v;
  return true;
}

export function setClearStencil(gl, v) {
  if (glState.clearStencil === v) return false;
  gl.clearStencil(v);
  glState.clearStencil = v;
  return true;
}

export function setBlend(gl, v) {
  if (glState.blend === v) return false;

  if (v) {
    gl.enable(gl.BLEND);
  } else {
    gl.disable(gl.BLEND);
  }

  glState.blend = v;
  return true;
}

export function setBlendFunc(gl, v) {
  const { blendFunc } = glState;

  if (blendFunc[0] === v[0] && blendFunc[1] === v[1]) {
    return false;
  }

  gl.blendFunc(v[0], v[1]);

  blendFunc[0] = v[0];
  blendFunc[1] = v[1];

  return true;
}

export function setBlendEquation(gl, v) {
  if (glState.blendEquation === v) return false;
  
  gl.blendEquation(v);

  glState.blendEquation = v;

  return true;
}

export function setBlendEquationSeparate(gl, v) {
  const { blendEquationSeparate } = glState;

  if (blendEquationSeparate[0] === v[0] &&
      blendEquationSeparate[1] === v[1]) {
    return false;
  }

  gl.blendEquationSeparate(v[0], v[1]);

  blendEquationSeparate[0] = v[0];
  blendEquationSeparate[1] = v[1];

  return true;
}

export function setBlendColor(gl, v) {
  const { blendColor } = glState;

  if (blendColor[0] === v[0] &&
    blendColor[1] === v[1] &&
    blendColor[2] === v[2] &&
    blendColor[3] === v[3]) {
    return false;
  }
  gl.blendColor(v[0], v[1], v[2], v[3]);

  blendColor[0] = v[0];
  blendColor[1] = v[1];
  blendColor[2] = v[2];
  blendColor[3] = v[3];

  return true;
}

export function setColorMask(gl, v) {
  const { colorMask } = glState;

  if (colorMask[0] === v[0] &&
    colorMask[1] === v[1] &&
    colorMask[2] === v[2] &&
    colorMask[3] === v[3]) {
    return false;
  }
  gl.colorMask(v[0], v[1], v[2], v[3]);

  colorMask[0] = v[0];
  colorMask[1] = v[1];
  colorMask[2] = v[2];
  colorMask[3] = v[3];

  return true;
}

export function setFrontFace(gl, v) {
  if (glState.frontFace === v) return false;

  gl.frontFace(v);
  glState.frontFace = v;

  return true;
}

export function setCullFace(gl, v) {
  if (glState.cullFace === v) return false;

  if (v) {
    gl.enable(gl.CULL_FACE);
  } else {
    gl.disable(gl.CULL_FACE);
  }

  glState.cullFace = v;

  return true;
}

export function setCullFaceMode(gl, v) {
  if (glState.cullFaceMode === v) return false;

  gl.cullFace(v);

  glState.cullFaceMode = v;

  return true;
}

export function setDepthTest(gl, v) {
  if (glState.depthTest === v) return false;

  if (v) {
    gl.enable(gl.DEPTH_TEST);
  } else {
    gl.disable(gl.DEPTH_TEST);
  }

  glState.depthTest = v;

  return true;
}

export function setDepthMask(gl, v) {
  if (glState.depthMask === v) return false;

  gl.depthMask(v);
  glState.depthMask = v;

  return true;
}

export function setDepthFunc(gl, v) {
  if (glState.depthFunc === v) return false;

  gl.depthFunc(v);
  glState.depthFunc = v;

  return true;
}

export function setDepthRange(gl, v) {
  const { depthRange } = glState;

  if (depthRange[0] === v[0] &&
      depthRange[1] === v[1]) return false;

  gl.depthRange(v[0], v[1]);

  depthRange[0] = v[0];
  depthRange[1] = v[1];

  return true;
}

export function setStencilTest(gl, v) {
  if (glState.stencilTest === v) return false;

  if (v) {
    gl.enable(gl.STENCIL_TEST);
  } else {
    gl.disable(gl.STENCIL_TEST);
  }

  glState.stencilTest = v;

  return true;
}

export function setStencilFunc(gl, v) {
  const { stencilFunc } = glState;

  if (stencilFunc[0] === v[0] &&
      stencilFunc[1] === v[1] &&
      stencilFunc[2] === v[2]) return false;

  gl.stencilFunc(v[0], v[1], v[2]);

  stencilFunc[0] = v[0];
  stencilFunc[1] = v[1];
  stencilFunc[2] = v[2];

  return true;
}

export function setStencilFuncSeparate(gl, v) {

}

export function setStencilMask(gl, v) {
  if (glState.stencilMask === v) return false;

  gl.stencilMask(v);
  glState.stencilMask = v;

  return true;
}

export function setStencilMaskSeparate(gl, v) {

}

export function setStencilOp(gl, v) {
  const { stencilOp } = glState;

  if (stencilOp[0] === v[0] &&
      stencilOp[1] === v[1] &&
      stencilOp[2] === v[2]) return false;

  gl.stencilOp(v[0], v[1], v[2]);

  stencilOp[0] = v[0];
  stencilOp[1] = v[1];
  stencilOp[2] = v[2];

  return true;
}

export function setStencilOpSeparate(gl, v) {

}

export function setScissorTest(gl, v) {
  if (glState.scissorTest === v) return false;

  if (v) {
    gl.enable(gl.SCISSOR_TEST);
  } else {
    gl.disable(gl.SCISSOR_TEST);
  }

  glState.scissorTest = v;

  return true;
}

export function setScissor(gl, v) {
  const { scissor } = glState;

  if (scissor[0] === v[0] &&
      scissor[1] === v[1] &&
      scissor[2] === v[2] &&
      scissor[3] === v[3]) return false;

  gl.scissor(v[0], v[1], v[2], v[3]);

  scissor[0] = v[0];
  scissor[1] = v[1];
  scissor[2] = v[2];
  scissor[3] = v[3];

  return true;
}

export function setViewport(gl, v) {
   const { viewport } = glState;

  if (viewport[0] === v[0] &&
      viewport[1] === v[1] &&
      viewport[2] === v[2] &&
      viewport[3] === v[3]) return false;

  gl.viewport(v[0], v[1], v[2], v[3]);

  viewport[0] = v[0];
  viewport[1] = v[1];
  viewport[2] = v[2];
  viewport[3] = v[3];

  return true;
}

export function setPackAlignment(gl, v) {
  if (glState.packAlignment === v) return false;

  gl.pixelStorei(gl.PACK_ALIGNMENT, v);
  glState.packAlignment = v;

  return true;
}

export function setUnpackAlignment(gl, v) {
  if (glState.unpackAlignment === v) return false;

  gl.pixelStorei(gl.UNPACK_ALIGNMENT, v);
  glState.unpackAlignment = v;

  return true;
}

export function setUnpackFlipY(gl, v) {
  if (glState.unpackFlipY === v) return false;

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, v);
  glState.unpackFlipY = v;

  return true;
}

export function setUnpackPremultiplyAlpha(gl, v) {
  if (glState.unpackPremultiplyAlpha === v) return false;

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v);
  glState.unpackPremultiplyAlpha = v;

  return true;
}

export function setUnpackColorSpaceConversion(gl, v) {
  if (glState.unpackColorSpaceConversion === v) return false;

  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, v);
  glState.unpackColorSpaceConversion = v;

  return true;
}

import {
  ARRAY_BUFFER,
  ELEMENT_ARRAY_BUFFER,
  TEXTURE_2D,
  TEXTURE_2D_ARRAY,
  TEXTURE_3D,
  TEXTURE_CUBE_MAP
} from './constants.mjs';
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
  stencilFunc: 0,
  stencilRef: 0,
  stencilMask: 0xFF,
  stencilBackFunc: 0,
  stencilBackRef: 0,
  stencilBackMask: 0xFF,
  stencilBits: 0,
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

  // NOTE: bindings
  program: null,
  [ARRAY_BUFFER]: null,
  [ELEMENT_ARRAY_BUFFER]: null,
  [TEXTURE_2D]: null,
  [TEXTURE_CUBE_MAP]: null,
  [TEXTURE_3D]: null,
  [TEXTURE_2D_ARRAY]: null,
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

export function getClearColor(gl, force = false) {
  const { clearColor } = glState;
  if (force) {
    const v = gl.getParameter(gl.COLOR_CLEAR_VALUE);
    clearColor[0] = v[0];
    clearColor[1] = v[1];
    clearColor[2] = v[2];
    clearColor[3] = v[3];
  }
  return clearColor;
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

export function getClearDepth(gl, force = false) {
  if (force) {
    glState.clearDepth = gl.getParameter(gl.DEPTH_CLEAR_VALUE);
  }
  return glState.clearDepth;
}

export function setClearDepth(gl, v) {
  if (glState.clearDepth === v) return false;
  gl.clearDepth(v);
  glState.clearDepth = v;
  return true;
}

export function getClearStencil(gl, force = false) {
  if (force) {
    glState.clearStencil = gl.getParameter(gl.STENCIL_CLEAR_VALUE);
  }
  return glState.clearStencil;
}

export function setClearStencil(gl, v) {
  if (glState.clearStencil === v) return false;
  gl.clearStencil(v);
  glState.clearStencil = v;
  return true;
}

export function getBlend(gl, force = false) {
  if (force) {
    glState.blend = gl.isEnabled(gl.BLEND);
  }
  return glState.blend;
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

export function getBlendFunc(gl, force = false) {

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

export function getBlendColor(gl, force = false) {
  const { blendColor } = glState;
  if (force) {
    const v = gl.getParameter(gl.BLEND_COLOR);
    blendColor[0] = v[0];
    blendColor[1] = v[1];
    blendColor[2] = v[2];
    blendColor[3] = v[3];
  }
  return blendColor;
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

export function getColorMask(gl, force = false) {
  const { colorMask } = glState;
  if (force) {
    const v = gl.getParameter(gl.COLOR_WRITEMASK);
    colorMask[0] = v[0];
    colorMask[1] = v[1];
    colorMask[2] = v[2];
    colorMask[3] = v[3];
  }
  return colorMask;
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

export function getFrontFace(gl, force = false) {
  if (force) {
    glState.frontFace = gl.getParameter(gl.FRONT_FACE);
  }
  return glState.frontFace;
}

export function setFrontFace(gl, v) {
  if (glState.frontFace === v) return false;

  gl.frontFace(v);
  glState.frontFace = v;

  return true;
}

export function getFullFace(gl, force = false) {
  if (force) {
    glState.cullFace = gl.isEnabled(gl.CULL_FACE);
  }
  return glState.cullFace;
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

export function getCullFaceMode(gl, force = false) {
  if (force) {
    glState.cullFaceMode = gl.getParameter(gl.CULL_FACE_MODE);
  }
  return glState.cullFaceMode;
}

export function setCullFaceMode(gl, v) {
  if (glState.cullFaceMode === v) return false;

  gl.cullFace(v);

  glState.cullFaceMode = v;

  return true;
}

export function getDepthTest(gl, force = false) {
  if (force) {
    glState.depthTest = gl.isEnabled(gl.DEPTH_TEST);
  }
  return glState.depthTest;
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

export function getDepthMask(gl, force = false) {
  if (force) {
    glState.depthMask = gl.getParameter(gl.DEPTH_WRITEMASK);
  }
  return glState.depthMask;
}

export function setDepthMask(gl, v) {
  if (glState.depthMask === v) return false;

  gl.depthMask(v);
  glState.depthMask = v;

  return true;
}

export function getDepthFunc(gl, force = false) {
  if (force) {
    glState.depthFunc = gl.getParameter(gl.DEPTH_FUNC);
  }
  return glState.depthFunc;
}

export function setDepthFunc(gl, v) {
  if (glState.depthFunc === v) return false;

  gl.depthFunc(v);
  glState.depthFunc = v;

  return true;
}

export function getDepthRange(gl, force = false) {
  const { depthRange } = glState;
  if (force) {
    const v = gl.getParameter(gl.DEPTH_RANGE);
    depthRange[0] = v[0];
    depthRange[1] = v[1];
  }
  return depthRange;
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

export function getStencilTest(gl, force = false) {
  if (force) {
    glState.stencilTest = gl.isEnabled(gl.STENCIL_TEST);
  }
  return glState.stencilTest;
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

export function getStencilFunc(gl, force = false) {
  if (force) {
    glState.stencilFunc = gl.getParameter(gl.STENCIL_FUNC);
  }
  return glState.stencilFunc;
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

export function getScissorTest(gl, force = false) {
  if (force) {
    glState.scissorTest = gl.getParameter(gl.SCISSOR_TEST);
  }
  return glState.scissorTest;
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

export function getScissor(gl, force = false) {
  const { scissor } = glState;
  if (force) {
    const v = gl.getParameter(gl.SCISSOR_BOX);
    scissor[0] = v[0];
    scissor[1] = v[1];
    scissor[2] = v[2];
    scissor[3] = v[3];
  }
  return scissor;
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

export function getViewport(gl, force = false) {
  const { viewport } = glState;
  if (force) {
    const v = gl.getParameter(gl.VIEWPORT);
    viewport[0] = v[0];
    viewport[1] = v[1];
    viewport[2] = v[2];
    viewport[3] = v[3];
  }
  return viewport;
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

export function getPackAlignment(gl, force = false) {
  if (force) {
    glState.packAlignment = gl.getParameter(gl.PACK_ALIGNMENT);
  }
  return glState.packAlignment;
}

export function setPackAlignment(gl, v) {
  if (glState.packAlignment === v) return false;

  gl.pixelStorei(gl.PACK_ALIGNMENT, v);
  glState.packAlignment = v;

  return true;
}

export function getUnpackAlignment(gl, force = false) {
  if (force) {
    glState.unpackAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
  }
  return glState.unpackAlignment;
}

export function setUnpackAlignment(gl, v) {
  if (glState.unpackAlignment === v) return false;

  gl.pixelStorei(gl.UNPACK_ALIGNMENT, v);
  glState.unpackAlignment = v;

  return true;
}

export function getUnpackFlipY(gl, force = false) {
  if (force) {
    glState.unpackFlipY = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL);
  }
  return glState.unpackFlipY;
}

export function setUnpackFlipY(gl, v) {
  if (glState.unpackFlipY === v) return false;

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, v);
  glState.unpackFlipY = v;

  return true;
}

export function getUnpackPremultiplyAlpha(gl, force = false) {
  if (force) {
    glState.unpackPremultiplyAlpha = gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
  }
  return glState.unpackPremultiplyAlpha;
}

export function setUnpackPremultiplyAlpha(gl, v) {
  if (glState.unpackPremultiplyAlpha === v) return false;

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v);
  glState.unpackPremultiplyAlpha = v;

  return true;
}

export function getUnpackColorSpaceConversion(gl, force = false) {
  if (force) {
    glState.unpackColorSpaceConversion = gl.getParameter(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL);
  }
  return glState.unpackColorSpaceConversion;
}

export function setUnpackColorSpaceConversion(gl, v) {
  if (glState.unpackColorSpaceConversion === v) return false;

  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, v);
  glState.unpackColorSpaceConversion = v;

  return true;
}

export function bindProgram(gl, program) {
  if (glState.program === program) return false;

  gl.useProgram(program.glProgram);
  glState.program = program;

  return true;
}

export function bindBuffer(gl, buffer) {
  const target = buffer.target;
  if (glState[target] === buffer) return false;

  gl.bindBuffer(target, buffer.glBuffer);
  glState[target] = buffer;

  return true;
}

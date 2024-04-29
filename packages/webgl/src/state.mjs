import {
  ARRAY_BUFFER,
  ELEMENT_ARRAY_BUFFER,
  TEXTURE_2D,
  TEXTURE_2D_ARRAY,
  TEXTURE_3D,
  TEXTURE_CUBE_MAP
} from './constants.mjs';

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
  polygonOffsetFill: false,
  polygonOffsetFactor: 0,
  polygonOffsetUnits: 0,

  // NOTE: pixelstorei
  packAlignment: 4,
  unpackAlignment: 4,
  unpackFlipY: false,
  unpackPremultiplyAlpha: false,
  unpackColorSpaceConversion: false,

  // NOTE: caps

  // NOTE: bindings
  program: null,
  vertexArray: null,
  [ARRAY_BUFFER]: null,
  [ELEMENT_ARRAY_BUFFER]: null,
  [TEXTURE_2D]: null,
  [TEXTURE_CUBE_MAP]: null,
  [TEXTURE_3D]: null,
  [TEXTURE_2D_ARRAY]: null,
};

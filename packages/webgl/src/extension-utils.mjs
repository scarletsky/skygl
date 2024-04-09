import { isWebGL2 } from './context-utils.mjs';

export function getExtensions(gl) {
  getExtDepthTexture(gl);
  getExtDrawBuffers(gl);
  getExtDrawBuffersIndexed(gl);
  getExtInstancedArrays(gl);
  getExtElementIndexUint(gl);
  getExtVertexArrayObject(gl);
  getExtShaderTextureLod(gl);
  getExtFragDepth(gl);
  getExtSRGB(gl);
  getExtStandardDerivatives(gl);
  getExtBlendMinMax(gl);
  getExtColorBufferFloat(gl);
  getExtColorBufferHalfFloat(gl);
  getExtTextureFloat(gl);
  getExtTextureHalfFloat(gl);
  getExtTextureFloatLinear(gl);
  getExtTextureHalfFloatLinear(gl);
  getExtTextureFilterAnisotropic(gl);
  getExtCompressedTextureETC1(gl);
  getExtCompressedTexturePVRTC(gl);
  getExtCompressedTextureS3TC(gl);
  getExtCompressedTextureS3TCSRGB(gl);
  getExtParallelShaderCompile(gl);
  getExtDisjointTimerQuery(gl);
  getExtDebugShaders(gl);
  getExtLoseContext(gl);
  return gl;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_depth_texture
export function getExtDepthTexture(gl) {
  if (gl.extDepthTexture === undefined) {
    if (isWebGL2(gl)) {
      gl.extDepthTexture = true;
    } else {
      gl.extDepthTexture = gl.getExtension('WEBGL_depth_texture');
    }
  }
  return gl.extDepthTexture;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/KHR_parallel_shader_compile
export function getExtParallelShaderCompile(gl) {
  if (gl.extParallelShaderCompile === undefined) {
    gl.extParallelShaderCompile = gl.getExtension('KHR_parallel_shader_compile');
  }
  return gl.extParallelShaderCompile;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers
export function getExtDrawBuffers(gl) {
  if (gl.extDrawBuffers === undefined) {
    if (isWebGL2(gl)) {
      gl.extDrawBuffers = true;
    } else {
      gl.extDrawBuffers = gl.getExtension('WEBGL_draw_buffers');
    }
  }
  return gl.extDrawBuffers;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/ANGLE_instanced_arrays
export function getExtInstancedArrays(gl) {
  if (gl.extInstancedArrays === undefined) {
    if (isWebGL2(gl)) {
      gl.extInstancedArrays = true;
    } else {
      gl.extInstancedArrays = gl.getExtension('ANGLE_instanced_arrays');
    }
  }
  return gl.extInstancedArrays;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_blend_minmax
export function getExtBlendMinMax(gl) {
  if (gl.extBlendMinMax === undefined) {
    if (isWebGL2(gl)) {
      gl.extBlendMinMax = true;
    } else {
      gl.extBlendMinMax = gl.getExtension('EXT_blend_minmax');
    }
  }
  return gl.extBlendMinMax;
}


// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_color_buffer_float
export function getExtColorBufferFloat(gl) {
  if (gl.extColorBufferFloat === undefined) {
    if (isWebGL2(gl)) {
      gl.extColorBufferFloat = gl.getExtension('EXT_color_buffer_float');
    } else {
      gl.extColorBufferFloat = gl.getExtension('WEBGL_color_buffer_float');
    }
  }
  return gl.extColorBufferFloat;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_color_buffer_half_float
export function getExtColorBufferHalfFloat(gl) {
  if (gl.extColorBufferHalfFloat === undefined) {
    gl.extColorBufferHalfFloat = gl.getExtension('EXT_color_buffer_half_float');
  }
  return gl.extColorBufferHalfFloat;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_disjoint_timer_query
export function getExtDisjointTimerQuery(gl) {
  if (gl.extDisjointTimerQuery === undefined) {
    if (isWebGL2(gl)) {
      gl.extDisjointTimerQuery = gl.getExtension('EXT_disjoint_timer_query_webgl2');
    } else {
      gl.extDisjointTimerQuery = gl.getExtension('EXT_disjoint_timer_query');
    }
  }
  return gl.extDisjointTimerQuery;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_frag_depth
export function getExtFragDepth(gl) {
  if (gl.extFragDepth === undefined) {
    if (isWebGL2(gl)) {
      gl.extFragDepth = true;
    } else {
      gl.extFragDepth = gl.getExtension('EXT_frag_depth');
    }
  }
  return gl.extFragDepth;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_sRGB
export function getExtSRGB(gl) {
  if (gl.extSRGB === undefined) {
    if (isWebGL2(gl)) {
      gl.extSRGB = true;
    } else {
      gl.extSRGB = gl.getExtension('EXT_sRGB');
    }
  }
  return gl.extSRGB;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_shader_texture_lod
export function getExtShaderTextureLod(gl) {
  if (gl.extShaderTextureLod === undefined) {
    if (isWebGL2(gl)) {
      gl.extShaderTextureLod = true;
    } else {
      gl.extShaderTextureLod = gl.getExtension('EXT_shader_texture_lod');
    }
  }
  return gl.extShaderTextureLod;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic
export function getExtTextureFilterAnisotropic(gl) {
  if (gl.extTextureFilterAnisotropic === undefined) {
    gl.extTextureFilterAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic');
  }
  return gl.extTextureFilterAnisotropic;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_draw_buffers_indexed
export function getExtDrawBuffersIndexed(gl) {
  if (gl.extDrawBuffersIndexed === undefined) {
    if (isWebGL2(gl)) {
      gl.extDrawBuffersIndexed = gl.getExtension('OES_draw_buffers_indexed');
    } else {
      gl.extDrawBuffersIndexed = false;
    }
  }
  return gl.extDrawBuffersIndexed;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint
export function getExtElementIndexUint(gl) {
  if (gl.extElementIndexUint === undefined) {
    if (isWebGL2(gl)) {
      gl.extElementIndexUint = true;
    } else {
      gl.extElementIndexUint = gl.getExtension('OES_element_index_uint');
    }
  }
  return gl.extElementIndexUint;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
export function getExtStandardDerivatives(gl) {
  if (gl.extStandardDerivatives === undefined) {
    if (isWebGL2(gl)) {
      gl.extStandardDerivatives = true;
    } else {
      gl.extStandardDerivatives = gl.getExtension('OES_standard_derivatives');
    }
  }
  return gl.extStandardDerivatives;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float
export function getExtTextureFloat(gl) {
  if (gl.extTextureFloat === undefined) {
    if (isWebGL2(gl)) {
      gl.extTextureFloat = true;
    } else {
      gl.extTextureFloat = gl.getExtension('OES_texture_float');
    }
  }
  return gl.extTextureFloat;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float
export function getExtTextureHalfFloat(gl) {
  if (gl.extTextureHalfFloat === undefined) {
    if (isWebGL2(gl)) {
      gl.extTextureHalfFloat = true;
    } else {
      gl.extTextureHalfFloat = gl.getExtension('OES_texture_half_float');
    }
  }
  return gl.extTextureHalfFloat;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_float_linear
export function getExtTextureFloatLinear(gl) {
  if (gl.extTextureFloatLinear === undefined) {
    gl.extTextureFloatLinear = gl.getExtension('OES_texture_float_linear');
  }
  return gl.extTextureFloatLinear;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_texture_half_float_linear
export function getExtTextureHalfFloatLinear(gl) {
  if (gl.extTextureHalfFloatLinear === undefined) {
    if (isWebGL2(gl)) {
      gl.extTextureHalfFloatLinear = true;
    } else {
      gl.extTextureHalfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
    }
  }
  return gl.extTextureHalfFloatLinear;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/OES_vertex_array_object
export function getExtVertexArrayObject(gl) {
  if (gl.extVertexArrayObject === undefined) {
    if (isWebGL2(gl)) {
      gl.extVertexArrayObject = true;
    } else {
      gl.extVertexArrayObject = gl.getExtension('OES_vertex_array_object');
    }
  }
  return gl.extVertexArrayObject;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_etc1
export function getExtCompressedTextureETC1(gl) {
  if (gl.extCompressedTextureETC1 === undefined) {
    gl.extCompressedTextureETC1 = gl.getExtension('WEBGL_compressed_texture_etc1');
  }
  return gl.extCompressedTextureETC1;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_pvrtc
export function getExtCompressedTexturePVRTC(gl) {
  if (gl.extCompressedTexturePVRTC === undefined) {
    gl.extCompressedTexturePVRTC = gl.getExtension('WEBGL_compressed_texture_pvrtc');
  }
  return gl.extCompressedTexturePVRTC;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc
export function getExtCompressedTextureS3TC(gl) {
  if (gl.extCompressedTextureS3TC === undefined) {
    gl.extCompressedTextureS3TC = gl.getExtension('WEBGL_compressed_texture_s3tc');
  }
  return gl.extCompressedTextureS3TC;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc_srgb
export function getExtCompressedTextureS3TCSRGB(gl) {
  if (gl.extCompressedTextureS3TCSRGB === undefined) {
    gl.extCompressedTextureS3TCSRGB = gl.getExtension('WEBGL_compressed_texture_s3tc_srgb');
  }
  return gl.extCompressedTextureS3TCSRGB;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_shaders
export function getExtDebugShaders(gl) {
  if (gl.extDebugShaders === undefined) {
    gl.extDebugShaders = gl.getExtension('WEBGL_debug_shaders');
  }
  return gl.extDebugShaders;
}

export function getExtDebugRendererInfo(gl) {
  if (gl.extDebugRendererInfo === undefined) {
    gl.extDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
  }
  return gl.extDebugRendererInfo;
}

// NOTE: https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context
export function getExtLoseContext(gl) {
  if (gl.extLoseContext === undefined) {
    gl.extLoseContext = gl.getExtension('WEBGL_lose_context');
  }
  return gl.extLoseContext;
}

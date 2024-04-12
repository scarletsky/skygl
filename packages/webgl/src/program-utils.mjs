import { shaderChunks } from './shader-chunks.mjs';

const includePattern = /#include <(.+)>/g;

export function parseLine(code = '', chunks = shaderChunks, includedSet = new Set()) {
  return code.replace(includePattern, function (_match, chunkName) {
    // NOTE: replace the duplicated `#include`
    if (includedSet.has(chunkName)) return '';

    includedSet.add(chunkName);

    return parseGLSL(chunks.get(chunkName), chunks, includedSet);
  });
}

export function parseGLSL(code = '', chunks = shaderChunks, includedSet = new Set()) {
  const lines = code.split('\n');
  const parsedLines = [];

  let line;
  for (let i = 0, len = lines.length; i < len; i++) {
    line = lines[i];
    parsedLines.push(parseLine(line, chunks, includedSet));
  }

  return parsedLines.join('\n');
}

export function addLineNumbers(src) {
  if (!src) return '';

  const lines = src.split('\n');

  // NOTE: Chrome reports shader errors on lines indexed from 1
  for (let i = 0, len = lines.length; i < len; i++) {
    lines[i] = `${i+1}: ` + lines[i];
  }

  return lines.join('\n');
}

export function createGLShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function getGLShaderCompileStatus(gl, glShader) {
  return gl.getShaderParameter(glShader, gl.COMPILE_STATUS);
}

export function createGLProgram(gl, glVertexShader, glFragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, glVertexShader);
  gl.attachShader(program, glFragmentShader);
  gl.linkProgram(program);
  return program;
}

export function getGLProgramLinkStatus(gl, glProgram) {
  return gl.getProgramParameter(glProgram, gl.LINK_STATUS);
}

export function getGLProgramLinkStatusKHR(gl, glProgram) {
  let complete;
  const { COMPLETION_STATUS_KHR } = gl.extParallelShaderCompile;

  complete = gl.getProgramParameter(glProgram, COMPLETION_STATUS_KHR);
  if (complete) return Promise.resolve(complete);

  return new Promise(resolve => {
    function checkAsync() {
      complete = gl.getProgramParameter(glProgram, COMPLETION_STATUS_KHR);

      if (!complete) {
        requestAnimationFrame(checkAsync);
      } else {
        resolve(getGLProgramLinkStatus(gl, glProgram));
      }
    }
    checkAsync();
  });
}

export function getGLProgramAttributes(gl, glProgram) {
  const attributes = [];
  const numAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);

  let name, type, size;
  let info, location, setter;
  for (let i = 0; i < numAttributes; i++) {
    info = gl.getActiveAttrib(glProgram, i);
    name = info.name;
    type = info.type;
    size = info.size;
    location = gl.getAttribLocation(glProgram, name);
    setter = setAttributePointer(gl, location);

    attributes.push({
      name,
      type,
      size,
      setter,
      location,
    });
  }

  return attributes;
}

export function getGLProgramUniforms(gl, glProgram) {
  const uniforms = {};
  const numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  let name, type, size;
  let info, location, setter;
  let array;
  for (let i = 0; i < numUniforms; i++) {
    info = gl.getActiveUniform(glProgram, i);
    name = info.name;
    type = info.type;
    size = info.size;
    array = isUniformArray(name);
    location = gl.getUniformLocation(glProgram, name);
    setter = getUniformSetter(gl, name, type, location, array);

    uniforms[name] = {
      type,
      size,
      location,
      value: null,
      setter,
      array,
    };
  }

  return uniforms;
}

export function setGLProgramAttribute(gl, attribute) {

}

export function setGLProgramUniform(gl, uniform) {
  uniform.setter(uniform.value);
}

export function getAttributeSetter(gl, type, location) {
  switch (type) {
    case gl.FLOAT: return setAttributeFloat(gl, location);
    case gl.FLOAT_VEC4: return setAttributeFloat4(gl, location);
    case gl.FLOAT_VEC3: return setAttributeFloat3(gl, location);
    case gl.FLOAT_VEC2: return setAttributeFloat2(gl, location);
  }
}

export function isUniformArray(name) {
  return name.endsWith('[0]');
}

export function getUniformSetter(gl, name, type, location, isArray) {
  if (isArray === undefined) isArray = isUniformArray(name);

  switch (type) {
    case gl.FLOAT:        return isArray ? setUniformFloatArray(gl, location) : setUniformFloat(gl, location);
    case gl.FLOAT_VEC4:   return isArray ? setUniformFloatVec4Array(gl, location) : setUniformFloatVec4(gl, location);
    case gl.FLOAT_VEC3:   return isArray ? setUniformFloatVec3Array(gl, location) : setUniformFloatVec3(gl, location);
    case gl.FLOAT_VEC2:   return isArray ? setUniformFloatVec2Array(gl, location) : setUniformFloatVec2(gl, location);
    case gl.FLOAT_MAT4:   return setUniformMat4(gl, location);
    case gl.FLOAT_MAT3:   return setUniformMat3(gl, location);
    case gl.FLOAT_MAT2:   return setUniformMat2(gl, location);
    case gl.INT:          return isArray ? setUniformIntArray(gl, location) : setUniformInt(gl, location);
    case gl.INT_VEC2:     return isArray ? setUniformIntVec2Array(gl, location) : setUniformIntVec2(gl, location);
    case gl.INT_VEC3:     return isArray ? setUniformIntVec3Array(gl, location) : setUniformIntVec3(gl, location);
    case gl.INT_VEC4:     return isArray ? setUniformIntVec4Array(gl, location) : setUniformIntVec4(gl, location);
    case gl.SAMPLER_2D:
    case gl.SAMPLER_CUBE: return setUniformInt(gl, location);
  }
}

// NOTE: attribute setters
export function setAttributeFloat(gl, location) {
  return function (v0) {
    gl.vertexAttrib1f(location, v0);
  }
}

export function setAttributeFloat2(gl, location) {
  return function (v0, v1) {
    gl.vertexAttrib2f(location, v0, v1);
  }
}

export function setAttributeFloat3(gl, location) {
  return function (v0, v1, v2) {
    gl.vertexAttrib3f(location, v0, v1, v2);
  }
}

export function setAttributeFloat4(gl, location) {
  return function (v0, v1, v2, v3) {
    gl.vertexAttrib4f(location, v0, v1, v2, v3);
  }
}

export function setAttributePointer(gl, location) {
  return function (p) {
    gl.vertexAttribPointer(location, p.size, p.type, p.normalized, p.stride, p.offset);
  }
}


// NOTE: uniform setters

// NOTE:
//   glsl: uniform float x;
//   js:   x = 1.0;
export function setUniformFloat(gl, location) {
  return function (v) {
    gl.uniform1f(location, v);
  }
}

// NOTE:
//   glsl: uniform float x[2];
//   js:   x = [1.0, 2.0];
export function setUniformFloatArray(gl, location) {
  return function (v) {
    gl.uniform1fv(location, v);
  }
}

// NOTE:
//   glsl: uniform vec2 x;
//   js:   x = [1.0, 2.0];
export function setUniformFloatVec2(gl, location) {
  return function (v) {
    gl.uniform2f(location, v[0], v[1]);
  }
}

// NOTE:
//   glsl: uniform vec2 x[2];
//   js:   x = [ [1.0, 2.0], [3.0, 4.0] ];
export function setUniformFloatVec2Array(gl, location) {
  return function (v) {
    gl.uniform2fv(location, v);
  }
}

// NOTE:
//   glsl: uniform vec3 x;
//   js:   x = [1.0, 2.0, 3.0];
export function setUniformFloatVec3(gl, location) {
  return function (v) {
    gl.uniform3f(location, v[0], v[1], v[2]);
  }
}

// NOTE:
//   glsl: uniform vec3 x[2]
//   js:   x = [ [1.0, 2.0, 3.0], [4.0, 5.0, 6.0] ]
export function setUniformFloatVec3Array(gl, location) {
  return function (v) {
    gl.uniform3fv(location, v);
  }
}

// NOTE:
//   glsl: uniform vec4 x
//   js:   x = [1.0, 2.0, 3.0, 4.0]
export function setUniformFloatVec4(gl, location) {
  return function (v) {
    gl.uniform4f(location, v[0], v[1], v[2], v[3]);
  }
}

// NOTE:
//   glsl: uniform vec4 x[2];
//   js:   x = [ [1.0, 2.0, 3.0, 4.0], [5.0, 6.0, 7.0, 8.0] ];
export function setUniformFloatVec4Array(gl, location) {
  return function (v) {
    gl.uniform4fv(location, v);
  }
}

// NOTE:
//   glsl: uniform int x;
//   js:   x = 1;
export function setUniformInt(gl, location) {
  return function (v) {
    gl.uniform1i(location, v);
  }
}

// NOTE:
//   glsl: uniform int x[2];
//   js:   x = [1, 2];
export function setUniformIntArray(gl, location) {
  return function (v) {
    gl.uniform1iv(location, v);
  }
}

// NOTE:
//   glsl: uniform ivec2 x;
//   js:   x = [1, 2];
export function setUniformIntVec2(gl, location) {
  return function (v) {
    gl.uniform2i(location, v[0], v[1]);
  }
}

// NOTE:
//   glsl: uniform ivec2 x[2];
//   js:   x = [ [1, 2], [3, 4] ];
export function setUniformIntVec2Array(gl, location) {
  return function (v) {
    gl.uniform2iv(location, v);
  }
}

// NOTE:
//   glsl: uniform ivec3 x;
//   js:   x = [1, 2, 3];
export function setUniformIntVec3(gl, location) {
  return function (v) {
    gl.uniform3i(location, v[0], v[1], v[2]);
  }
}

// NOTE:
//   glsl: uniform ivec3 x[2];
//   js:   x = [ [1, 2, 3], [4, 5, 6] ];
export function setUniformIntVec3Array(gl, location) {
  return function (v) {
    gl.uniform3iv(location, v);
  }
}

// NOTE:
//   glsl: uniform ivec4 x;
//   js:   x = [1, 2, 3, 4];
export function setUniformIntVec4(gl, location) {
  return function (v) {
    gl.uniform4i(location, v[0], v[1], v[2], v[3]);
  }
}

// NOTE:
//   glsl: uniform ivec4 x[2];
//   js:   x = [ [1, 2, 3, 4], [5, 6, 7, 8] ];
export function setUniformIntVec4Array(gl, location) {
  return function (v) {
    gl.uniform4iv(location, v);
  }
}

// NOTE:
//   glsl: uniform mat2 x;
//   js:   x = [1, 2, 3, 4];
export function setUniformMat2(gl, location) {
  return function (v) {
    gl.uniformMatrix2fv(location, false, v);
  }
}


// NOTE:
//   glsl: uniform mat3 x;
//   js:   x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export function setUniformMat3(gl, location) {
  return function (v) {
    gl.uniformMatrix3fv(location, false, v);
  }
}

// NOTE:
//   glsl: uniform mat4 x;
//   js:   x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export function setUniformMat4(gl, location) {
  return function (v) {
    gl.uniformMatrix4fv(location, false, v);
  }
}


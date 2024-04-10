import { shaderChunks } from './shader-chunks.mjs';

const includePattern = /#include <(.+)>/g;

export function parseLine(code = '', chunks = shaderChunks, includedSet = new Set()) {
  return code.replace(includePattern, function (match, chunkName) {
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


// NOTE: uniform setters
export function setUniformFloat(gl, location) {
  return function (v) {
    gl.uniform1f(location, v);
  }
}

export function setUniformFloatArray(gl, location) {
  return function (v) {
    gl.uniform1fv(location, v);
  }
}

export function setUniformFloatVec2(gl, location) {
  return function (v) {
    gl.uniform2f(location, v[0], v[1]);
  }
}

export function setUniformFloatVec2Array(gl, location) {
  return function (v) {
    gl.uniform2fv(location, v);
  }
}

export function setUniformFloatVec3(gl, location) {
  return function (v) {
    gl.uniform3f(location, v[0], v[1], v[2]);
  }
}

export function setUniformFloatVec3Array(gl, location) {
  return function (v) {
    gl.uniform3fv(location, v);
  }
}

export function setUniformFloatVec4(gl, location) {
  return function (v) {
    gl.uniform4f(location, v[0], v[1], v[2], v[3]);
  }
}

export function setUniformFloatVec4Array(gl, location) {
  return function (v) {
    gl.uniform4fv(location, v);
  }
}


export function setUniformInt(gl, location) {
  return function (v) {
    gl.uniform1i(location, v);
  }
}

export function setUniformIntArray(gl, location) {
  return function (v) {
    gl.uniform1iv(location, v);
  }
}

export function setUniformIntVec2(gl, location) {
  return function (v) {
    gl.uniform2i(location, v[0], v[1]);
  }
}

export function setUniformIntVec2Array(gl, location) {
  return function (v) {
    gl.uniform2iv(location, v);
  }
}

export function setUniformIntVec3(gl, location) {
  return function (v) {
    gl.uniform3i(location, v[0], v[1], v[2]);
  }
}

export function setUniformIntVec3Array(gl, location) {
  return function (v) {
    gl.uniform3iv(location, v);
  }
}

export function setUniformIntVec4(gl, location) {
  return function (v) {
    gl.uniform4i(location, v[0], v[1], v[2], v[3]);
  }
}

export function setUniformIntVec4Array(gl, location) {
  return function (v) {
    gl.uniform4iv(location, v);
  }
}

export function setUniformMat2(gl, location) {
  return function (v) {
    gl.uniformMatrix2fv(location, false, v);
  }
}

export function setUniformMat3(gl, location) {
  return function (v) {
    gl.uniformMatrix3fv(location, false, v);
  }
}

export function setUniformMat4(gl, location) {
  return function (v) {
    gl.uniformMatrix4fv(location, false, v);
  }
}


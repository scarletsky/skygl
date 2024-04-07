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

export function createShader(gl, vertexShaderSource, fragmentShaderSource, options) {

}

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function compileVertexShader(gl, source) {
  return compileShader(gl, gl.VERTEX_SHADER, source);
}

export function compileFragmentShader(gl, source) {
  return compileShader(gl, gl.FRAGMENT_SHADER, source);
}

export function createProgram(gl, glVertexShader, glFragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, glVertexShader);
  gl.attachShader(program, glFragmentShader);
  gl.linkProgram(program);
  return program;
}

export function getProgramLinkStatus(gl, glProgram) {
  return gl.getProgramParameter(glProgram, gl.LINK_STATUS);
}

export function getProgramLinkStatusKHR(gl, glProgram) {

}

export function getProgramAttributes(gl, glProgram) {
  const attributes = [];
  const numAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);

  let info, location, setter;
  for (let i = 0; i < numAttributes; i++) {
    info = gl.getActiveAttrib(glProgram, i);
    location = gl.getAttribLocation(glProgram, info.name);

    attributes.push({
      name: info.name,
      type: info.type,
      size: info.size,
      setter,
      location,
    });
  }

  return attributes;
}

export function getProgramUniforms(gl, glProgram) {
  const uniforms = {};
  const numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  let info, location, setter;
  for (let i = 0; i < numUniforms; i++) {
    info = gl.getActiveUniform(glProgram, i);
    location = gl.getUniformLocation(glProgram, info.name);

    uniforms[info.name] = {
      type: info.type,
      size: info.size,
      location,
      value: null,
    };
  }

  return uniforms;
}

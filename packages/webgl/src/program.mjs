import { shaderChunks } from './shader-chunks.mjs';
import {
  parseGLSL,
  addLineNumbers,
  createGLShader,
  createGLProgram,
  getGLProgramVertexAttribs,
  getGLProgramUniforms,
  getGLProgramLinkStatus,
  getGLProgramLinkStatusKHR,
} from './program-utils.mjs';
import { bindBuffer, bindVertexArray } from './context-utils.mjs';
import { getExtParallelShaderCompile } from './extension-utils.mjs';

const PROGRAM_STATUS_INIT = 0;
const PROGRAM_STATUS_WAIT = 1;
const PROGRAM_STATUS_DONE = 2;
const PROGRAM_STATUS_ERROR = -1;

export class Program {
  constructor(options = {}) {
    this.gl = options.gl || null;
    this.vertexShader = options.vertexShader || '';
    this.fragmentShader = options.fragmentShader || '';
    this.version = '300'
    this.precision = 'highp';
    this.defines = options.defines || {};
    this.extensions = options.extensions || {};
    this.attributes = [];
    this.uniforms = {};
    this.tryParallelCompile = options.tryParallelCompile || false;
    // NOTE: [vertexShader, fragmentShader, program]
    this.status = [
      PROGRAM_STATUS_INIT,
      PROGRAM_STATUS_INIT,
      PROGRAM_STATUS_INIT
    ];
    this.glVertexShader = null;
    this.glFragmentShader = null;
    this.glProgram = null;
    this.ok = false;
  }

  getVertexShaderSource() {
    return getProgramVertexShaderSource(null, this, shaderChunks);
  }

  getFragmentShaderSource() {
    return getProgramFragmentShaderSource(null, this, shaderChunks);
  }

  compile(gl = this.gl) {
    return compileProgram(gl, this);
  }

  link(gl = this.gl) {
    return linkProgram(gl, this);
  }

  waitUntilLinked(gl = this.gl) {
    return waitUntilProgramLinked(gl, this);
  }

  setUniform(name, value) {
    return setProgramUniform(this.gl, this, name, value);
  }

  setUniforms(data = {}) {
    return setProgramUniforms(_gl, this, data);
  }
}

Program.prototype.isProgram = true;

export function createProgram(gl, vertexShader, fragmentShader, options = {}) {
  return new Program({ gl, vertexShader, fragmentShader, ...options });
}

export function deleteProgram(gl, program) {
  if (!program.glProgram) return false;

  if (program.glVertexShader) {
    gl.detachShader(program.glProgram, program.glVertexShader);
    program.glVertexShader = null;
  }

  if (program.glFragmentShader) {
    gl.detachShader(program.glProgram, program.glFragmentShader);
    program.glFragmentShader = null;
  }

  gl.deleteProgram(program.glProgram);
  program.glProgram = null;

  return true;
}

export function getProgramVertexShaderSource(_gl, program, shaderChunks) {
  return parseGLSL(program.vertexShader, shaderChunks);
}

export function getProgramFragmentShaderSource(_gl, program, shaderChunks) {
  return parseGLSL(program.fragmentShader, shaderChunks);
}

export function compileProgram(gl, program) {
  if (program.ok) return program;
  if (program.glVertexShader && program.glFragmentShader) return program;

  if (!program.glVertexShader) {
    const vertexShaderSource = getProgramVertexShaderSource(gl, program, shaderChunks);
    program.glVertexShader = createGLShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    program.status[0] = PROGRAM_STATUS_WAIT;
  }

  if (!program.glFragmentShader) {
    const fragmentShaderSource = getProgramFragmentShaderSource(gl, program, shaderChunks);
    program.glFragmentShader = createGLShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    program.status[1] = PROGRAM_STATUS_WAIT;
  }

  return program;
}

export function compilePrograms(gl, programs = []) {
  return programs.map(program => compileProgram(gl, program));
}

export function linkProgram(gl, program) {
  if (program.ok) return program;
  if (program.glProgram) return program;

  program.glProgram = createGLProgram(gl, program.glVertexShader, program.glFragmentShader);
  program.status[2] = PROGRAM_STATUS_WAIT;

  return program;
}

export function linkPrograms(gl, programs = []) {
  return programs.map(program => program.link(gl));
}

export function compileAndLinkProgram(gl, program) {
  compileProgram(gl, program);
  linkProgram(gl, program);
  return program;
}

export function waitUntileShaderCompile(gl, program) {
  if (program.ok) return true;

  const { glVertexShader, glFragmentShader } = program;

  if (program.status[0] > PROGRAM_STATUS_INIT && program.status[0] < PROGRAM_STATUS_DONE) {
    if (!gl.getShaderParameter(glVertexShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile vertex shader:\n\n");
      console.error(addLineNumbers(program.getVertexShaderSource()) + "\n\n");
      console.error(gl.getShaderInfoLog(glVertexShader));
      program.status[0] = PROGRAM_STATUS_ERROR;
      return false;
    }
    program.status[0] = PROGRAM_STATUS_DONE;
  }

  if (program.status[1] > PROGRAM_STATUS_INIT && program.status[1] < PROGRAM_STATUS_DONE) {
    if (!gl.getShaderParameter(glFragmentShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile fragment shader:\n\n");
      console.error(addLineNumbers(program.getFragmentShaderSource()) + "\n\n");
      console.error(gl.getShaderInfoLog(glFragmentShader));
      program.status[1] = PROGRAM_STATUS_ERROR;
      return false;
    }
    program.status[1] = PROGRAM_STATUS_DONE;
  }

  return (program.status[0] === PROGRAM_STATUS_DONE) && (program.status[1] === PROGRAM_STATUS_DONE);
}

export async function waitUntilProgramLinked(gl, program) {
  if (program.ok) return true;
  if (program.status[2] === PROGRAM_STATUS_ERROR) return false;

  compileAndLinkProgram(gl, program);

  if (!waitUntileShaderCompile(gl, program)) return false;

  let linked = false;

  const { glProgram, tryParallelCompile } = program;

  if (tryParallelCompile && getExtParallelShaderCompile(gl)) {
    linked = await getGLProgramLinkStatusKHR(gl, glProgram);
  } else {
    linked = getGLProgramLinkStatus(gl, glProgram);
  }

  if (!linked) {
    console.error("Failed to link shader program. Error: ");
    console.error(gl.getProgramInfoLog(glProgram));
    program.status[2] = PROGRAM_STATUS_ERROR;
  } else {
    program.attributes = getGLProgramVertexAttribs(gl, glProgram);
    program.uniforms = getGLProgramUniforms(gl, glProgram);
    program.status[2] = PROGRAM_STATUS_DONE;
  }

  program.ok = linked;

  return program;
}

export function setProgramUniform(_gl, program, name, nextValue) {
  const uniform = program.uniforms[name];

  if (!uniform) return false;
  if (uniform.value === nextValue) return false;

  uniform.nextValue = nextValue;

  return true;
}

export function setProgramUniforms(_gl, program, data = {}) {
  for (let name in data) {
    const nextValue = data[name];
    setProgramUniform(_gl, program, name, nextValue);
  }
  return true;
}

export function bindProgramVertexAttribs(gl, program, vertexAttribs) {
  for (let programAttrib of program.attributes) {
    const vertexAttrib = vertexAttribs[programAttrib.name];

    bindBuffer(gl, vertexAttrib.buffer);
    gl.enableVertexAttribArray(programAttrib.location);
    programAttrib.setter(vertexAttrib);
  }

  return true;
}

export function bindProgramVertexArray(gl, program, vertexArray, vertexAttribs) {
  bindVertexArray(gl, vertexArray);

  if (vertexArray.ok) return true;

  bindProgramVertexAttribs(gl, program, vertexAttribs);
  vertexArray.ok = true;

  return true;
}

export function bindProgramUniforms(_gl, program) {
  const { uniforms } = program;

  for (let name in uniforms) {
    const uniform = uniforms[name];

    if (uniform.value !== uniform.nextValue) {
      uniform.value = uniform.nextValue;
      uniform.setter(uniform.value);
    }
  }

  return true;
}

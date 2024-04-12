import { shaderChunks } from './shader-chunks.mjs';
import {
  parseGLSL,
  addLineNumbers,
  createGLShader,
  createGLProgram,
  getGLProgramAttributes,
  getGLProgramUniforms,
  getGLShaderCompileStatus,
  getGLProgramLinkStatus,
  getGLProgramLinkStatusKHR,
} from './program-utils.mjs';
import { getExtParallelShaderCompile } from './extension-utils.mjs';

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
    this.ok = false;
    this.linkStatus = 0;
    this.glVertexShader = null;
    this.glFragmentShader = null;
    this.glProgram = null;
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

  async waitUntilLinked(gl = this.gl) {
    return waitUntilProgramLinked(gl, this);
  }
}

Program.prototype.isProgram = true;

export function createProgram(gl, vertexShader, fragmentShader, options = {}) {
  return new Program({ gl, vertexShader, fragmentShader, ...options });
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

  const vertexShaderSource = getProgramVertexShaderSource(gl, program, shaderChunks);
  const fragmentShaderSource = getProgramFragmentShaderSource(gl, program, shaderChunks);

  program.glVertexShader = createGLShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  program.glFragmentShader = createGLShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  return program;
}

export function compilePrograms(gl, programs = []) {
  return programs.map(program => compileProgram(gl, program));
}

export function linkProgram(gl, program) {
  if (program.ok) return program;
  if (program.glProgram) return program;

  program.glProgram = createGLProgram(gl, program.glVertexShader, program.glFragmentShader);

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

export async function waitUntilProgramLinked(gl, program) {
  if (program.ok) return program;

  compileAndLinkProgram(gl, program);

  let linked = false;
  const { glVertexShader, glFragmentShader, glProgram } = program;

  if (!getGLShaderCompileStatus(gl, glVertexShader)) {
    console.error("Failed to compile vertex shader:\n\n");
    console.error(addLineNumbers(program.getVertexShaderSource()) + "\n\n");
    console.error(gl.getShaderInfoLog(glVertexShader));
    return false;
  }

  if (!getGLShaderCompileStatus(gl, glFragmentShader)) {
    console.error("Failed to compile fragment shader:\n\n");
    console.error(addLineNumbers(program.getFragmentShaderSource()) + "\n\n");
    console.error(gl.getShaderInfoLog(glFragmentShader));
    return false;
  }

  if (getExtParallelShaderCompile(gl)) {
    linked = await getGLProgramLinkStatusKHR(gl, glProgram);
  } else {
    linked = getGLProgramLinkStatus(gl, glProgram);
  }

  if (!linked) {
    console.error("Failed to link shader program. Error: ");
    console.error(gl.getProgramInfoLog(glProgram));
  } else {
    program.attributes = getGLProgramAttributes(gl, glProgram);
    program.uniforms = getGLProgramUniforms(gl, glProgram);
  }

  program.ok = linked;

  return program;
}

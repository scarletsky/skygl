import { shaderChunks } from './shader-chunks.mjs';
import {
  parseGLSL,
  addLineNumbers,
  createGLShader,
  createGLProgram,
  getGLProgramAttributes,
  getGLProgramUniforms,
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
    this.ready = false;
    this.linked = false;
    this.glVertexShader = null;
    this.glFragmentShader = null;
    this.glProgram = null;
  }

  getVertexShaderSource() {
    return parseGLSL(this.vertexShader, shaderChunks);
  }

  getFragmentShaderSource() {
    return parseGLSL(this.fragmentShader, shaderChunks);
  }

  compile(gl = this.gl) {
    const vertexShaderSource = this.getVertexShaderSource();
    const fragmentShaderSource = this.getFragmentShaderSource();

    this.glVertexShader = createGLShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    this.glFragmentShader = createGLShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  }

  link(gl = this.gl) {
    if (this.glProgram) return this;

    this.glProgram = createGLProgram(gl, this.glVertexShader, this.glFragmentShader);

    return this;
  }

  async waitUntilLinked(gl = this.gl) {
    if (this.linked) return true;

    let linked = false;

    const { glVertexShader, glFragmentShader, glProgram } = this;

    if (!gl.getShaderParameter(glVertexShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile vertex shader:\n\n" + addLineNumbers(this.getVertexShaderSource()) + "\n\n" + gl.getShaderInfoLog(glVertexShader));
      return false;
    }

    if (!gl.getShaderParameter(glFragmentShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile fragment shader:\n\n" + addLineNumbers(this.getFragmentShaderSource()) + "\n\n" + gl.getShaderInfoLog(glFragmentShader));
      return false;
    }

    if (getExtParallelShaderCompile(gl)) {
      linked = await getGLProgramLinkStatusKHR(gl, glProgram);
    } else {
      linked = getGLProgramLinkStatus(gl, glProgram);
    }

    if (!linked) {
      console.error("Failed to link shader program. Error: " + gl.getProgramInfoLog(glProgram));
    } else {
      this.attributes = getGLProgramAttributes(gl, glProgram);
      this.uniforms = getGLProgramUniforms(gl, glProgram);
    }

    this.linked = linked;

    return linked;
  }
}

Program.prototype.isProgram = true;

export function createProgram(gl, vertexShader, fragmentShader, options = {}) {
  return new Program({ gl, vertexShader, fragmentShader, ...options });
}

export function compileProgram(gl, program) {
  return program.compile(gl);
}

export function compilePrograms(gl, programs = []) {
  return programs.map(program => program.compile(gl));
}

export function linkProgram(gl, program) {
  return program.link(gl);
}

export function linkPrograms(gl, programs = []) {
  return programs.map(program => program.link(gl));
}

export function compileAndLinkProgram(gl, program) {
  compileProgram(gl, program);
  linkProgram(gl, program);
  return program;
}

// NOTE: alias
// export const Shader = Program;
// export const createShader = createProgram;
// export const compileShader = compileProgram;
// export const compileShaders = compilePrograms;
// export const linkShader = linkProgram;
// export const linkShaders = linkPrograms;
// export const compileAndLinkShader = compileAndLinkProgram;

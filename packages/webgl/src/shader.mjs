import { shaderChunks } from './shader-chunks.mjs';
import {
  parseGLSL,
  addLineNumbers,
  createGLShader,
  createGLProgram,
  getGLProgramAttributes,
  getGLProgramUniforms,
} from './shader-utils.mjs';

export class Shader {
  constructor(vertexShader = '', fragmentShader = '') {
    this.version = '300'
    this.precision = 'highp';
    this.defines = {};
    this.extensions = {};
    this.attributes = [];
    this.uniforms = {};
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.ready = false;
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

  compile(gl) {
    const vertexShaderSource = this.getVertexShaderSource();
    const fragmentShaderSource = this.getFragmentShaderSource();

    this.glVertexShader = createGLShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    this.glFragmentShader = createGLShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  }

  link(gl) {
    if (this.glProgram) return this;

    this.glProgram = createGLProgram(gl, this.glVertexShader, this.glFragmentShader);

    return this;
  }

  postLink(gl) {
    if (this.ready) return this;

    const { glVertexShader, glFragmentShader, glProgram } = this;

    if (!gl.getShaderParameter(glVertexShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile vertex shader:\n\n" + addLineNumbers(this.getVertexShaderSource()) + "\n\n" + gl.getShaderInfoLog(glVertexShader));
      return false;
    }

    if (!gl.getShaderParameter(glFragmentShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile fragment shader:\n\n" + addLineNumbers(this.getFragmentShaderSource()) + "\n\n" + gl.getShaderInfoLog(glFragmentShader));
      return false;
    }

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      console.error("Failed to link shader program. Error: " + gl.getProgramInfoLog(glProgram));
      return false;
    }

    this.attributes = getGLProgramAttributes(gl, glProgram);
    this.uniforms = getGLProgramUniforms(gl, glProgram);

    this.ready = true;

    return this;
  }
}

Shader.prototype.isShader = true;

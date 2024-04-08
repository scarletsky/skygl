import { shaderChunks } from './shader-utils.mjs';
import {
  parseGLSL,
  compileVertexShader,
  compileFragmentShader,
  addLineNumbers,
  createProgram,
} from './shader-utils.mjs';

export class Shader {
  constructor(vertexShader = '', fragmentShader = '') {
    this.version = '300'
    this.precision = 'highp';
    this.defines = {};
    this.extensions = {};
    this.attributes = {};
    this.uniforms = {};
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.ready = false;
    this._glVertexShader = null;
    this._glFragmentShader = null;
    this._glProgram = null;
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

    this._glVertexShader = compileVertexShader(gl, vertexShaderSource);
    this._glFragmentShader = compileFragmentShader(gl, fragmentShaderSource);
    this._glProgram = createProgram(gl, this._glVertexShader, this._glFragmentShader);
  }

  postLink(gl) {
    if (this.ready) return this;

    const { _glVertexShader, _glFragmentShader, _glProgram } = this;

    if (!gl.getShaderParameter(_glVertexShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile vertex shader:\n\n" + addLineNumbers(this.getVertexShaderSource()) + "\n\n" + gl.getShaderInfoLog(_glVertexShader));
      return false;
    }

    if (!gl.getShaderParameter(_glFragmentShader, gl.COMPILE_STATUS)) {
      console.error("Failed to compile fragment shader:\n\n" + addLineNumbers(this.getFragmentShaderSource()) + "\n\n" + gl.getShaderInfoLog(_glFragmentShader));
      return false;
    }

    if (!gl.getProgramParameter(_glProgram, gl.LINK_STATUS)) {
      console.error("Failed to link shader program. Error: " + gl.getProgramInfoLog(_glProgram));
      return false;
    }

    this.ready = true;
    return this;
  }
}

Shader.prototype.isShader = true;

export const SYSTEM = {};
export const CUSTOM = {};

export class ShaderChunks {
  constructor(system = {}, custom = {}) {
    this.system = system;
    this.custom = custom
  }
}

export const shaderChunks = new ShaderChunks(SYSTEM, CUSTOM);

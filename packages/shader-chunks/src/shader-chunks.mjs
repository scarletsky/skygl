export const SYSTEM = {};
export const CUSTOM = {};

export class ShaderChunks {
  constructor(system = {}, custom = {}) {
    this.system = system;
    this.custom = custom
  }

  get(chunkName) {
    return this.custom[chunkName] || this.system[chunkName] || '';
  }
}

export const shaderChunks = new ShaderChunks(SYSTEM, CUSTOM);

import * as ShaderChunks from "./program-lib/shader-chunks";
import * as ShaderLib from "./program-lib/shader-lib";

export * from "./graphics";
export { default as Device } from "./device";
export { default as Shader } from "./shader";
export { default as Buffer } from "./buffer";
export { default as VertexBuffer } from "./vertex-buffer";
export { default as IndexBuffer } from "./index-buffer";
export { default as Primitive } from "./primitive";
export { default as Texture } from "./texture";

export const shaderChunks = ShaderChunks;
export const shaderLib = ShaderLib;

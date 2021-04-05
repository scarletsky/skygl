import { Shader, ShaderSourceDefines } from './Shader';
import { shaderChunks } from './ShaderChunks';

export function parseDefines(defines: ShaderSourceDefines) {
    let defs = '';

    for (let key in defines) {
        let value = defines[key];
        defs += `#define ${key} ${value}\n`;
    }

    return defs;
}

export function parseIncludes(src: string, chunks = shaderChunks) {
    return src.replace(/\#include\ \<(.*?)\>/g, (_match, p1) => chunks.get(p1));
}

export function parseVertexShader(shader: Shader) {
    return parseDefines(shader.vertexDefines) + parseIncludes(shader.vertexSource, shader.chunks || shaderChunks);
}

export function parseFragmentShader(shader: Shader) {
    return parseDefines(shader.fragmentDefines) + parseIncludes(shader.fragmentSource, shader.chunks || shaderChunks);
}

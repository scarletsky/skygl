import { Shader, ShaderSourceDefine } from './Shader';
import { shaderChunks } from './ShaderChunks';

export function parseDefine(define: ShaderSourceDefine) {
    let result = '';

    for (let key in define) {
        let value = define[key];
        result += `#define ${key} ${value}\n`;
    }

    return result;
}

export function parseIncludes(src: string, chunks = shaderChunks) {
    return src.replace(/\#include\ \<(.*?)\>/g, (_match, p1) => chunks.get(p1));
}

export function parseVertexShader(shader: Shader) {
    return parseDefine(shader.vertexDefine) + parseIncludes(shader.vertexSource, shader.chunks || shaderChunks);
}

export function parseFragmentShader(shader: Shader) {
    return parseDefine(shader.fragmentDefine) + parseIncludes(shader.fragmentSource, shader.chunks || shaderChunks);
}

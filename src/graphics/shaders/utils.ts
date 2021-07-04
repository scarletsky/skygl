import { Shader, ShaderSourceDefine, ShaderSourcePrecision } from './Shader';
import { shaderChunks } from './ShaderChunks';

export function parseDefine(define: ShaderSourceDefine) {
    let result = '';

    for (let key in define) {
        let value = define[key];

        if (value === false) continue;
        if (value === 0) continue;

        result += `#define ${key} ${value}\n`;
    }

    return result;
}

export function parseInclude(src: string, chunks = shaderChunks) {
    return src.replace(/\#include\ \<(.*?)\>/g, (_match, p1) => chunks.get(p1));
}

export function parsePrecision(precision: ShaderSourcePrecision) {
    return `precision ${precision} float;\n`;
}

export function parseVertexShader(shader: Shader) {
    return parseDefine(shader.vertexDefine) +
        parsePrecision(shader.precision) +
        parseInclude(shader.vertexSource, shader.chunks || shaderChunks);
}

export function parseFragmentShader(shader: Shader) {
    return parseDefine(shader.fragmentDefine) +
        parsePrecision(shader.precision) +
        parseInclude(shader.fragmentSource, shader.chunks || shaderChunks);
}

export function addLineNumber(src: string) {
    const lines = src.split('\n');

    for (let i = 0; i < lines.length; i++) {
        lines[i] = `${i + 1} ${lines[i]}`;
    }

    return lines.join('\n');
}

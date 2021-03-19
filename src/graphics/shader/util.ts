import { ShaderSourceDefines } from './Shader';
import { ShaderChunks } from './ShaderChunks';

export function parseIncludes(src: string, chunks: ShaderChunks) {
    return src.replace(/\#include\ \<(.*?)\>/g, (_match, p1) => chunks.get(p1));
}

export function parseDefines(src: string, defines: ShaderSourceDefines) {
    let defs = '';

    for (let key in defines) {
        let value = defines[key];
        defs += `#define ${key} ${value}\n`;
    }

    return defs + src;
}

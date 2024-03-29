import { shaderChunks } from './shader-chunks.mjs';

const includePattern = /#include <(.+)>/g;

export function resolveInclude(name, chunks = shaderChunks) {
  return chunks.custom[name] || chunks.system[name] || '';
}

export function parseLine(code = '', chunks = shaderChunks, includedSet = new Set()) {
  return code.replace(includePattern, function (match, chunkName) {
    // NOTE: replace the duplicated `#include`
    if (includedSet.has(chunkName)) return '';

    includedSet.add(chunkName);

    return parseGLSL(resolveInclude(chunkName, chunks), chunks, includedSet);
  });
}

export function parseGLSL(code = '', chunks = shaderChunks, includedSet = new Set()) {
  const lines = code.split('\n');
  const parsedLines = [];

  let line;
  for (let i = 0, len = lines.length; i < len; i++) {
    line = lines[i];
    parsedLines.push(parseLine(line, chunks, includedSet));
  }

  return parsedLines.join('\n');
}

import { shaderChunks } from './shader-chunks.mjs';

const includePattern = /#include <(.+)>/g;

export function parseLine(code = '', chunks = shaderChunks, includedSet = new Set()) {
  return code.replace(includePattern, function (match, chunkName) {
    // NOTE: replace the duplicated `#include`
    if (includedSet.has(chunkName)) return '';

    includedSet.add(chunkName);

    return parseGLSL(chunks.get(chunkName), chunks, includedSet);
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

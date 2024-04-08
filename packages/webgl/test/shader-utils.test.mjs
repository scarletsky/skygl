import test from 'tape';
import { parseGLSL, addLineNumbers } from '../src/shader-utils.mjs';
import { ShaderChunks } from '../src/shader-chunks.mjs';

test('parseGLSL with undefined', (t) => {
  t.equal(parseGLSL(), '');
  t.end();
});

test('parseGLSL with empty string', (t) => {
  t.equal(parseGLSL(''), '');
  t.end();
});

test('parseGLSL with custom shader chunks', (t) => {
  const system = {
    xxx: `attribute vec3 POSITION;`,
    yyy: `attribute vec3 NORMAL;`
  };
  const custom = {
    foo: 'float add(float a, float b) { return a + b; }',
    bar: 'float sub(float a, float b) { return a - b; }',
  };
  const shaderChunks = new ShaderChunks(system, custom);
  const glsl = [
    '#version 300 es',
    '#include <xxx>',
    '#include <yyy>',
    '#include <foo>',
    '#include <bar>'
  ].join('\n');
  const code = parseGLSL(glsl, shaderChunks);

  t.ok(code.includes(system.xxx));
  t.ok(code.includes(system.yyy));
  t.ok(code.includes(custom.foo));
  t.ok(code.includes(custom.bar));
  t.end();
});

test('parseGLSL with nested and duplicated `#include`', (t) => {
  const system = {
    xxx: [
      '#include <yyy>',
      'vec3 xxx = vec3(1.0)'
    ].join('\n'),
    yyy: `vec3 yyy = vec3(1.0);`
  };
  const custom = {
    foo: 'vec3 foo = vec3(1.0);',
    bar: [
      '#include <foo>',
      '#include <yyy>',
      'vec3 bar = vec3(1.0);'
    ].join('\n')
  };
  const shaderChunks = new ShaderChunks(system, custom);
  const glsl = [
    '#version 300 es',
    '#include <xxx>',
    '#include <bar>',
    '#include <bar>',
    '#include <foo>',
    'vec3 glsl = vec3(1.0);'
  ].join('\n');

  const code = parseGLSL(glsl, shaderChunks);
  const lines = code.split('\n');

  t.equal(lines.filter(line => line.includes('vec3 xxx = vec3(1.0)')).length, 1);
  t.equal(lines.filter(line => line.includes('vec3 yyy = vec3(1.0)')).length, 1);
  t.equal(lines.filter(line => line.includes('vec3 foo = vec3(1.0)')).length, 1);
  t.equal(lines.filter(line => line.includes('vec3 bar = vec3(1.0)')).length, 1);
  t.end();
});


test('addLineNumbers should starts with 1', (t) => {
  const lines = [
    'attribute vec3 POSITION;',
    'attribute vec3 NORMAL;',
    '',
    'void main() {',
    '  gl_Position = POSITION * 2.0 - 1.0;',
    '}'
  ];

  const result = addLineNumbers(lines.join('\n'));
  const resultLines = result.split('\n');

  t.equal(lines.length, resultLines.length);
  t.equal(resultLines[0], `1: ${lines[0]}`);
  t.equal(resultLines[3], `4: ${lines[3]}`);
  t.end();
});

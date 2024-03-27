import test from 'tape';
import { config, clamp, lerp, round, equals, exactEquals } from '../src/common.mjs';

test('round', (t) => {
  t.equal(round(0.5), 1);
  t.equal(round(-0.5), -1);
  t.end();
});

test('lerp', (t) => {
  t.equal(lerp(2, 4, 0), 2);
  t.equal(lerp(2, 4, 1), 4);
  t.equal(lerp(2, 4, 0.2), 2.4);
  t.end();
});

test('clamp', (t) => {
  t.equal(clamp(-0.5, 0, 1), 0);
  t.equal(clamp(-0.5, -1, 0), -0.5);
  t.equal(clamp(-0.5, -2, -1), -1);
  t.equal(clamp(1, 3, 2), 2);
  t.end();
});

test('equals', (t) => {
  t.equal(equals(0.001, 0.001), true);
  t.equal(equals(1e-7, 1e-9), true);
  t.equal(equals(1e-3, 1e-4, 0.01), true);
  t.end();
});

test('exactEquals', (t) => {
  t.equal(exactEquals(0.001, 0.001), true);
  t.equal(exactEquals(1e-7, 1e-9), false);
  t.end();
});

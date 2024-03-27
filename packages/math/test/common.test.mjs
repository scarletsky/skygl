import test from 'tape';
import { config, clamp, lerp, round } from '../src/common.mjs';

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

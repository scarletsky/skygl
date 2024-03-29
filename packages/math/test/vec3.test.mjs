import test from 'tape';
import { Vec3 } from '../src/vec3.mjs';

test('Vec3#constructor', (t) => {

  t.test('Vec3 default values are all zero', (t) => {
    const v1 = new Vec3();
    t.equal(v1[0], 0);
    t.equal(v1[1], 0);
    t.equal(v1[2], 0);
    t.end();
  });

  t.test('Vec3 instance can access by index and {x,y,z} getter', (t) => {
    const v1 = new Vec3(1, 2, 3);
    t.equal(v1[0], 1);
    t.equal(v1[1], 2);
    t.equal(v1[2], 3);

    const v2 = new Vec3(3, 2, 1);
    t.equal(v2.x, 3);
    t.equal(v2.y, 2);
    t.equal(v2.z, 1);

    t.end();
  });

  t.end();
});

test('Vec3 {x,y,z} setter', (t) => {
  const v1 = new Vec3(3, 4, 5);
  v1.x = 1;
  v1.y = 2;
  v1.z = 3;

  t.equal(v1.x, 1);
  t.equal(v1.y, 2);
  t.equal(v1.z, 3);
  t.equal(v1[0], 1);
  t.equal(v1[1], 2);
  t.equal(v1[2], 3);

  t.end();
});

test('Vec3#set', (t) => {
  const v1 = new Vec3();
  v1.set(-1, -2, 3);
  t.equal(v1.x, -1);
  t.equal(v1.y, -2);
  t.equal(v1.z, 3);
  t.end();
});

test('Vec3#clone', (t) => {
  t.test('without `res` params', (t) => {
    const v1 = new Vec3(3, 4, 5);
    const v2 = v1.clone();
    t.equal(v2[0], v1[0]);
    t.equal(v2[1], v1[1]);
    t.equal(v2[2], v1[2]);
    t.notEqual(v1, v2);
    t.end();
  });

  t.test('with `res` params', (t) => {
    const v1 = new Vec3(-2, -3, -4);
    const v2 = new Vec3();
    const v3 = v1.clone(v2);
    t.equal(v1.x, v2.x);
    t.equal(v1.y, v2.y);
    t.equal(v1.z, v2.z);
    t.equal(v2, v3);
    t.end();
  });

  t.end();
});

test('Vec3#copy', (t) => {
  const v1 = new Vec3();
  const v2 = new Vec3(1, 2, 3);
  v1.copy(v2);
  t.equal(v1.x, v2.x);
  t.equal(v1.y, v2.y);
  t.equal(v1.z, v2.z);
  t.end();
});

test(`Vec3#add`, (t) => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(2, 3, 4);
  v1.add(v2);
  t.equal(v1.x, 3);
  t.equal(v1.y, 5);
  t.equal(v1.z, 7);
  t.end();
});

test(`Vec3#add2`, (t) => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(2, 3, 4);
  const v3 = new Vec3();
  v3.add2(v1, v2);
  t.equal(v3.x, 3);
  t.equal(v3.y, 5);
  t.equal(v3.z, 7);
  t.end();
});

test(`Vec3#addScalar`, (t) => {
  const v1 = new Vec3(1, 2, 3);
  v1.addScalar(3);
  t.equal(v1.x, 4);
  t.equal(v1.y, 5);
  t.equal(v1.z, 6);
  t.end();
});

test('Vec3#subtract', (t) => {
  const v1 = new Vec3(3, 2, 1);
  const v2 = new Vec3(0, 1, 2);
  v1.subtract(v2);
  t.equal(v1.x, 3);
  t.equal(v1.y, 1);
  t.equal(v1.z, -1);
  t.end();
});

test('Vec3#subtract2', (t) => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(-1, -2, -3);
  const v3 = new Vec3();
  v3.subtract2(v1, v2);
  t.equal(v3.x, 2);
  t.equal(v3.y, 4);
  t.equal(v3.z, 6);
  t.end();
});

test('Vec3#subtractScalar', (t) => {
  const v1 = new Vec3(1, 2, 3);
  v1.subtractScalar(3);
  t.equal(v1.x, -2);
  t.equal(v1.y, -1);
  t.equal(v1.z, 0);
  t.end();
});

test('Vec3#multiply', (t) => {
  const v1 = new Vec3(3, 2, 1);
  const v2 = new Vec3(0, 1, 2);
  v1.multiply(v2);
  t.equal(v1.x, 0);
  t.equal(v1.y, 2);
  t.equal(v1.z, 2);
  t.end();
});

test('Vec3#multiply2', (t) => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(-1, -2, -3);
  const v3 = new Vec3();
  v3.multiply2(v1, v2);
  t.equal(v3.x, -1);
  t.equal(v3.y, -4);
  t.equal(v3.z, -9);
  t.end();
});

test('Vec3#multiplyScalar', (t) => {
  const v1 = new Vec3(1, 2, 3);
  v1.multiplyScalar(3);
  t.equal(v1.x, 3);
  t.equal(v1.y, 6);
  t.equal(v1.z, 9);
  t.end();
});

test('Vec3#divide', (t) => {
  const v1 = new Vec3(3, 2, 1);
  const v2 = new Vec3(0.5, 1, 2);
  v1.divide(v2);
  t.equal(v1.x, 6);
  t.equal(v1.y, 2);
  t.equal(v1.z, 0.5);
  t.end();
});

test('Vec3#divide2', (t) => {
  const v1 = new Vec3(1, 2, 3);
  const v2 = new Vec3(-1, -2, -3);
  const v3 = new Vec3();
  v3.divide2(v1, v2);
  t.equal(v3.x, -1);
  t.equal(v3.y, -1);
  t.equal(v3.z, -1);
  t.end();
});

test('Vec3#divideScalar', (t) => {
  const v1 = new Vec3(1, 2, 3);
  v1.divideScalar(2);
  t.equal(v1.x, 0.5);
  t.equal(v1.y, 1);
  t.equal(v1.z, 1.5);
  t.end();
});

test('Vec3#ceil', (t) => {
  const v1 = new Vec3(1.1, 2.6, 3.3);
  v1.ceil();
  t.equal(v1.x, 2);
  t.equal(v1.y, 3);
  t.equal(v1.z, 4);
  t.end();
});

test('Vec3#floor', (t) => {
  const v1 = new Vec3(1.1, 2.6, 3.3);
  v1.floor();
  t.equal(v1.x, 1);
  t.equal(v1.y, 2);
  t.equal(v1.z, 3);
  t.end();
});

test('Vec3#round', (t) => {
  const v1 = new Vec3(2.1, 3.6, 5.5);
  v1.round();
  t.equal(v1.x, 2);
  t.equal(v1.y, 4);
  t.equal(v1.z, 6);

  const v2 = new Vec3(-0.5, -0.4, -2.6);
  v2.round();
  t.equal(v2.x, -1);
  t.equal(v2.y, -0);
  t.equal(v2.z, -3);

  t.end();
});

test('Vec3#min', (t) => {
  const v1 = new Vec3(1, 5, 3);
  const v2 = new Vec3(4, 2, 6);
  v1.min(v2);

  t.equal(v1.x, 1);
  t.equal(v1.y, 2);
  t.equal(v1.z, 3);
  t.end();
});

test('Vec3#min2', (t) => {
  const v0 = new Vec3();
  const v1 = new Vec3(1, 5, 3);
  const v2 = new Vec3(4, 2, 6);
  v0.min2(v1, v2);

  t.equal(v0.x, 1);
  t.equal(v0.y, 2);
  t.equal(v0.z, 3);
  t.end();
});

test('Vec3#max', (t) => {
  const v1 = new Vec3(1, 5, 3);
  const v2 = new Vec3(4, 2, 6);
  v1.max(v2);

  t.equal(v1.x, 4);
  t.equal(v1.y, 5);
  t.equal(v1.z, 6);
  t.end();
});

test('Vec3#max2', (t) => {
  const v0 = new Vec3();
  const v1 = new Vec3(1, 5, 3);
  const v2 = new Vec3(4, 2, 6);
  v0.max2(v1, v2);

  t.equal(v0.x, 4);
  t.equal(v0.y, 5);
  t.equal(v0.z, 6);
  t.end();
});

test('Vec3#negate', (t) => {
  const v1 = new Vec3(2, 3, 4);
  v1.negate();

  t.equal(v1.x, -2);
  t.equal(v1.y, -3);
  t.equal(v1.z, -4);
  t.end();
});

test('Vec3#zero', (t) => {
  const v1 = new Vec3(2, 3, 4);
  v1.zero();

  t.equal(v1.x, 0);
  t.equal(v1.y, 0);
  t.equal(v1.z, 0);
  t.end();
});

test('Vec3#inverse', (t) => {
  const v1 = new Vec3(2, 4, 6);
  v1.inverse();

  t.equal(v1.x, 0.5);
  t.equal(v1.y, 0.25);
  t.equal(v1.z, 1/6);
  t.end();
});

test('Vec3#length', (t) => {
  const v1 = new Vec3(3, 4, 0);
  t.equal(v1.length(), 5);
  t.end();
});

test('Vec3#lengthSq', (t) => {
  const v1 = new Vec3(3, 4, 0);
  t.equal(v1.lengthSq(), 25);
  t.end();
});

test('Vec3#random', (t) => {
  const v1 = new Vec3();
  v1.random();
  t.notEqual(v1.x, 0);
  t.notEqual(v1.y, 0);
  t.notEqual(v1.z, 0);
  t.end();
});

test('Vec3#normalize', (t) => {
  const v1 = new Vec3(1, 1, 1);
  v1.normalize();
  t.equal(v1.length(), 1);
  t.end();
});

test('Vec3#dot', (t) => {
  const v1 = new Vec3(3, 4, 0);
  const v2 = new Vec3(1, 0, 0);
  const v3 = new Vec3(0, 1, 0);
  t.equal(v1.dot(v2), 3);
  t.equal(v1.dot(v3), 4);
  t.end();
});

test('Vec3#cross', (t) => {
  const v1 = new Vec3();
  const v2 = new Vec3(0, 0, -1);
  v1.set(1, 0, 0).cross(v2);

  t.equal(v1.x, -0);
  t.equal(v1.y, 1);
  t.equal(v1.z, 0);

  const out = new Vec3();
  v1.set(0, 1, 0).cross(v2, out);

  t.equal(out.x, -1);
  t.equal(out.y, 0);
  t.equal(out.z, 0);
  t.end();
});

test('Vec3#cross2', (t) => {
  const v1 = new Vec3(1, 0, 0);
  const v2 = new Vec3(0, 0, -1);
  const v3 = new Vec3();
  v3.cross2(v1, v2);

  t.equal(v3.x, -0);
  t.equal(v3.y, 1);
  t.equal(v3.z, 0);

  const out = new Vec3();
  v1.set(0, 1, 0);
  v3.zero();
  v3.cross2(v1, v2, out);

  t.equal(v3.x, 0);
  t.equal(v3.y, 0);
  t.equal(v3.z, 0);

  t.equal(out.x, -1);
  t.equal(out.y, 0);
  t.equal(out.z, 0);
  t.end();
});

import { Vec3 } from 'math/Vec3';
import { EPSILON } from 'math/math';

test('Vec3#add', function() {
    const v1 = new Vec3(1, 1, 1);
    const v2 = new Vec3(2, 0, 2);
    const v3 = new Vec3(-1, -2, -3);

    v1.add(v2);
    expect(v1.toJSON()).toEqual([3, 1, 3]);

    v1.add(v3);
    expect(v1.toJSON()).toEqual([2, -1, 0]);
});

test('Vec3#add2', function() {
    const v1 = new Vec3(1, 1, 1);
    const v2 = new Vec3(2, 0, 2);
    const v3 = new Vec3(-1, -2, -3);
    const v4 = new Vec3();

    v4.add2(v1, v2);
    expect(v4.toJSON()).toEqual([3, 1, 3]);

    v4.add2(v1, v3);
    expect(v4.toJSON()).toEqual([0, -1, -2]);
});

test('Vec3#clone', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);
    const v3 = v1.clone();
    const v4 = v2.clone();

    expect(v3.toJSON()).toEqual(v1.toJSON());
    expect(v4.toJSON()).toEqual(v2.toJSON());
});

test('Vec3#copy', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);
    const v3 = new Vec3();
    const v4 = new Vec3();

    v3.copy(v1);
    expect(v3.toJSON()).toEqual(v1.toJSON());

    v4.copy(v2);
    expect(v4.toJSON()).toEqual(v2.toJSON());
});

test('Vec3#cross2', function() {
    const v1 = new Vec3(1, 0, 0);
    const v2 = new Vec3(0, 1, 0);
    const v3 = new Vec3(0, 0, 1);
    const v4 = new Vec3();

    v4.cross2(v1, v2);
    expect(v4.toJSON()).toEqual([0, 0, 1]);

    v4.cross2(v2, v3);
    expect(v4.toJSON()).toEqual([1, 0, 0]);
});

test('Vec3#dot', function() {
    const v1 = new Vec3(1, 0, 0);
    const v2 = new Vec3(0, 1, 0);
    const v3 = new Vec3(1, 1, 0);

    expect(v1.dot(v2)).toBe(0);
    expect(v1.dot(v3)).toBe(1);
    expect(v2.dot(v3)).toBe(1);
});

test('Vec3#equals', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(1, 2, 3);
    const v3 = new Vec3(3, 2, 1);

    expect(v1.equals(v2)).toBeTruthy();
    expect(v1.equals(v3)).toBeFalsy();
});

test('Vec3#length', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -1, -1);
    const v3 = new Vec3(3, 4, 5);

    expect(Math.abs(v1.length() - Math.sqrt(14))).toBeLessThan(EPSILON);
    expect(Math.abs(v2.length() - Math.sqrt(3))).toBeLessThan(EPSILON);
    expect(Math.abs(v3.length() - Math.sqrt(50))).toBeLessThan(EPSILON);
});

test('Vec3#lengthSq', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -1, -1);
    const v3 = new Vec3(3, 4, 5);

    expect(v1.lengthSq()).toBe(14);
    expect(v2.lengthSq()).toBe(3);
    expect(v3.lengthSq()).toBe(50);
});

test('Vec3#lerp', function() {
    const v1 = new Vec3(0, 0, 0);
    const v2 = new Vec3(10, 10, 10);

    v1.lerp(v2, 0);
    expect(v1.toJSON()).toEqual([0, 0, 0]);

    v1.set(0, 0, 0);
    v1.lerp(v2, 0.5);
    expect(v1.toJSON()).toEqual([5, 5, 5]);

    v1.set(0, 0, 0);
    v1.lerp(v2, 1);
    expect(v1.toJSON()).toEqual([10, 10, 10]);
});


test('Vec3#lerp2', function() {
    const v1 = new Vec3(0, 0, 0);
    const v2 = new Vec3(10, 10, 10);
    const v3 = new Vec3();

    v3.lerp2(v1, v2, 0);
    expect(v3.toJSON()).toEqual([0, 0, 0]);

    v3.lerp2(v1, v2, 0.5);
    expect(v3.toJSON()).toEqual([5, 5, 5]);

    v3.lerp2(v1, v2, 1);
    expect(v3.toJSON()).toEqual([10, 10, 10]);
});

test('Vec3#mul', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 2, 1);
    const v3 = new Vec3(-1, -2, -3);

    v1.mul(v2);
    expect(v1.toJSON()).toEqual([3, 4, 3]);

    v1.mul(v3);
    expect(v1.toJSON()).toEqual([-3, -8, -9]);
});

test('Vec3#mul2', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 2, 1);
    const v3 = new Vec3(-1, -2, -3);
    const v4 = new Vec3();

    v4.mul2(v1, v2);
    expect(v4.toJSON()).toEqual([3, 4, 3]);

    v4.mul2(v4, v3);
    expect(v4.toJSON()).toEqual([-3, -8, -9]);
});

test('Vec3#normalize', function() {
    const v1 = new Vec3(10, 0, 0).normalize();
    const v2 = new Vec3(0, -5, 0).normalize();
    const v3 = new Vec3(0, 0, 9).normalize();

    expect(v1.length()).toBe(1);
    expect(v1.x).toBe(1);

    expect(v2.length()).toBe(1);
    expect(v2.y).toBe(-1);

    expect(v3.length()).toBe(1);
    expect(v3.z).toBe(1);
});

test('Vec3#project', function() {
    const v1 = new Vec3(1, 1, 0);
    const v2 = new Vec3(-2, -2, 0);
    const v3 = new Vec3(10, 0, 0);
    v1.project(v3);
    v2.project(v3);

    expect(v1.toJSON()).toEqual([1, 0, 0]);
    expect(v2.toJSON()).toEqual([-2, -0, -0]);
});

test('Vec3#scale', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-2, -3, -4);
    v1.scale(5);
    v2.scale(9);

    expect(v1.toJSON()).toEqual([5, 10, 15]);
    expect(v2.toJSON()).toEqual([-18, -27, -36]);
});

test('Vec3#set', function() {
    const v1 = new Vec3();
    const v2 = new Vec3();
    v1.set(1, 2, 3);
    v2.set(-9, -8, -7);

    expect(v1.toJSON()).toEqual([1, 2, 3])
    expect(v2.toJSON()).toEqual([-9, -8, -7]);
});

test('Vec3#sub', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(5, 6, 7);
    const v3 = new Vec3(-2, -3, -4);

    v1.sub(v2);
    expect(v1.toJSON()).toEqual([-4, -4, -4]);

    v1.sub(v3);
    expect(v1.toJSON()).toEqual([-2, -1, 0]);
});

test('Vec3#sub2', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(5, 6, 7);
    const v3 = new Vec3(-2, -3, -4);
    const v4 = new Vec3();

    v4.sub2(v1, v2);
    expect(v4.toJSON()).toEqual([-4, -4, -4]);

    v4.sub2(v4, v3);
    expect(v4.toJSON()).toEqual([-2, -1, 0]);
});

test('Vec3#toJSON', function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);

    expect(v1.toJSON()).toEqual([1, 2, 3]);
    expect(v2.toJSON()).toEqual([-1, -2, -3]);
});

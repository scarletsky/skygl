import { Vec3 } from 'math/Vec3';
import { Quat } from 'math/Quat';
import { Mat4, Mat4Data } from 'math/Mat4';

let vecA = new Vec3();
let quatA = new Quat();
let matA = new Mat4();
let matB = new Mat4();
let matC: Mat4;

const dataA: Mat4Data = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    1, 2, 3, 1
];
const dataB: Mat4Data = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    4, 5, 6, 1
];

beforeEach(() => {
    matA.set(dataA);
    matB.set(dataB);
    matC = new Mat4();
});

test('new Mat4', () => {
    expect(matC.data).toEqual(Mat4.IDENTITY.data);
});

test('Mat4#invert', () => {
    matA.invert();
    expect(matA.data).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, -2, -3, 1
    ]);
});

test('Mat4#mul', () => {
    matA.mul(matB);
    expect(matA.data).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
    ]);
    expect(matB.data).toEqual(dataB);
});

test('Mat4#mul2', () => {
    matC.mul2(matA, matB);
    expect(matC.data).toEqual([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        5, 7, 9, 1
    ]);
    expect(matA.data).toEqual(dataA);
    expect(matB.data).toEqual(dataB);
});

test('Mat4#clone', () => {
    expect(matA.clone().data).toEqual(matA.data);
});

test('Mat4#copy', () => {
    matA.copy(matB);
    expect(matA.data).toEqual(matB.data);
});

test('Mat4#transpose', () => {
    matA.transpose();
    expect(matA.data).toEqual([
        1, 0, 0, 1,
        0, 1, 0, 2,
        0, 0, 1, 3,
        0, 0, 0, 1
    ]);
});

test('Mat4#setIdentity', () => {
    matA.setIdentity();
    expect(matA.data).toEqual(Mat4.IDENTITY.data);
});

test('Mat4#getTranslation', () => {
    expect(matA.getTranslation().toJSON()).toEqual([1, 2, 3]);

    matA.getTranslation(vecA);
    expect(vecA.toJSON()).toEqual([1, 2, 3]);
});

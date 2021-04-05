import { Vec3 } from 'math/Vec3';
import { Quat } from 'math/Quat';
import { Mat3 } from 'math/Mat3';
import { Mat4 } from 'math/Mat4';
import { EPSILON, DEG_TO_RAD, RAD_TO_DEG } from 'math/math';

let vecA = new Vec3();
let quatA = new Quat();
let quatB = new Quat();
let quatC = new Quat();
const DEG_90 = Math.PI / 2;

beforeEach(() => {
    quatA.set(1, 2, 3, 4);
    quatB.set(5, 6, 7, 8);
    quatC.set(0, 0, 0, 0);
    vecA.set(1, 1, -1);
});

test('Quat#set', () => {
    quatA.set(4, 3, 2, 1);
    expect(quatA.toJSON()).toEqual([4, 3, 2, 1]);
});

test('Quat#clone', () => {
    const quat = quatA.clone();
    expect(quatA.toJSON()).toEqual(quat.toJSON());
    expect(quatA === quat).toBeFalsy();
});

test('Quat#copy', () => {
    quatC.copy(quatA);
    expect(quatC.toJSON()).toEqual(quatA.toJSON());
    quatC.copy(quatB);
    expect(quatC.toJSON()).toEqual(quatB.toJSON());
});

test('Quat#conjugate', () => {
    quatA.conjugate();
    expect(quatA.toJSON()).toEqual([-1, -2, -3, 4]);
});

test('Quat#notmalize', () => {
    quatA.normalize();
    const quat = new Quat().set(0.182574, 0.365148, 0.547722, 0.730296);
    expect(quatA.equals(quat)).toBeTruthy();
});

test('Quat#length', () => {
    expect(Math.abs(quatA.length() - 5.477225)).toBeLessThanOrEqual(EPSILON);
    expect(Math.abs(quatB.length() - 13.190905)).toBeLessThanOrEqual(EPSILON);
    expect(quatC.length()).toEqual(0);
});

test('Quat#lengthSq', () => {
    expect(quatA.lengthSq()).toEqual(30);
    expect(quatB.lengthSq()).toEqual(174);
    expect(quatC.lengthSq()).toEqual(0);
});

test('Quat#mul', () => {
    quatA.mul(quatB);
    expect(quatA.toJSON()).toEqual([24, 48, 48, -6]);
});

test('Quat#mul2', () => {
    quatC.mul2(quatA, quatB);
    expect(quatC.toJSON()).toEqual([24, 48, 48, -6]);
});

test('Quat#setIdentity', () => {
    quatA.setIdentity();
    expect(quatA.equals(Quat.IDENTITY)).toBeTruthy();
});

test('Quat#getEulerAngle', () => {
    quatA.set(0.022260026714733816, 0.43967973954090955, 0.3604234056503559, 0.8223631719059994);
    quatA.getEulerAngle(vecA);
    expect(vecA.equals(new Vec3(30, 45, 60))).toBeTruthy();
});

test('Quat#setFromEulerAngle', () => {
    quatA.setFromEulerAngle(30, 45, 60);
    quatB.set(0.022260, 0.439679, 0.360423, 0.822363);
    expect(quatA.equals(quatB)).toBeTruthy();
});

test('Quat#getAxisAngle', () => {
    quatA.set(0.18569533817705183, 0.27854300726557774, 0.37139067635410367, 0.8660254037844387);
    const axis = new Vec3(30, 45, 60).normalize();
    const angle = quatA.getAxisAngle(vecA) * RAD_TO_DEG;
    expect(Math.abs(angle - 60)).toBeLessThanOrEqual(EPSILON);
    expect(vecA.equals(axis)).toBeTruthy();
});

test('Quat#setFromAxisAngle', () => {
    const axis = new Vec3(30, 45, 60).normalize();
    const rad = 60 * DEG_TO_RAD;
    quatA.setFromAxisAngle(axis, rad);
    quatB.set(0.185695, 0.278543, 0.371390, 0.866025);
    expect(quatA.equals(quatB)).toBeTruthy();
});

test('Quat#setFromMat3', () => {
    const mat = new Mat3();
    mat.set([
        1, 0,  0,
        0, 0, -1,
        0, 1,  0
    ]);
    quatC.setFromMat3(mat);

    expect(quatC.equals(new Quat(-0.707106, 0, 0, 0.707106))).toBeTruthy();
});

test('Quat#setFromMat4', () => {
    const mat = new Mat4();
    mat.set([
        1, 0,  0, 0,
        0, 0, -1, 0,
        0, 1,  0, 0,
        0, 0, 0, 1
    ]);
    quatC.setFromMat4(mat);

    expect(quatC.equals(new Quat(-0.707106, 0, 0, 0.707106))).toBeTruthy();
});

test('Quat#equals', () => {
    quatA.set(1, 2, 3, 4);
    quatB.set(1, 2, 3, 4);
    expect(quatA.equals(quatB)).toBeTruthy();
});

test('Quat#toJSON', () => {
    expect(quatA.toJSON()).toEqual([1, 2, 3, 4]);
    expect(quatB.toJSON()).toEqual([5, 6, 7, 8]);
    expect(quatC.toJSON()).toEqual([0, 0, 0, 0]);
});

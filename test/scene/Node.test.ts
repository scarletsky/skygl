import { Vec3 } from 'math/Vec3';
import { Quat } from 'math/Quat';
import { Mat4 } from 'math/Mat4';
import { Node } from 'scene/Node';

let root: Node;
let child: Node;
let child1: Node;
let child2: Node;
const vec1 = new Vec3(3, 4, 5);
const vec2 = new Vec3(5, 2, 2);
const vec3 = new Vec3(30, 20, 10);
const vec4 = new Vec3(10, 10, 10);
const quat1 = new Quat().setEulerAngle(30, 20, 10);
const quat2 = new Quat().setEulerAngle(45, 45, 45);


beforeEach(() => {
    root = new Node();
    child = new Node();
    child1 = new Node();
    child2 = new Node();
});

test('Node#addChild', () => {
    expect(root.children.length).toBe(0);
    expect(child.parent).toBeNull();

    root.addChild(child);

    expect(root.children.length).toBe(1);
    expect(root.children[0]).toBe(child);
    expect(child.parent).toBe(root);
});

test('Node#removeChild', () => {
    root.addChild(child1);
    root.addChild(child2);

    expect(root.children.length).toBe(2);
    expect(child1.parent).toBe(root);

    root.removeChild(child1);

    expect(root.children.length).toBe(1);
    expect(root.children[0]).toBe(child2);
    expect(child1.parent).toBeNull();

    root.removeChild(child2);

    expect(root.children.length).toBe(0);
    expect(child2.parent).toBeNull();
});

test('Node#getLocalPosition and Node#setLocalPosition', () => {
    root.setLocalPosition(vec1);

    expect([
        root.localTransform.data[12],
        root.localTransform.data[13],
        root.localTransform.data[14]
    ]).toEqual([0, 0, 0]);

    expect(root.getLocalPosition().equals(vec1)).toBeTruthy();
});

test('Node#getWorldPosition and Node#setWorldPosition', () => {
    const vec3 = new Vec3();

    root.setWorldPosition(vec1);
    expect(root.getLocalPosition().equals(vec1)).toBeTruthy();
    expect(root.getWorldPosition().equals(vec1)).toBeTruthy();

    root.addChild(child);
    expect(child.getLocalPosition().equals(Vec3.ZERO)).toBeTruthy();
    expect(child.getWorldPosition().equals(vec1)).toBeTruthy();

    child.setWorldPosition(vec2);
    vec3.sub2(vec2, vec1);
    expect(child.getLocalPosition().equals(vec3)).toBeTruthy();
    expect(child.getWorldPosition().equals(vec2)).toBeTruthy();
});

test('Node#getLocalRotation and Node#setLocalRotation', () => {
    expect(root.getLocalRotation().equals(Quat.IDENTITY)).toBeTruthy();

    root.setLocalRotation(quat1);
    expect(root.getLocalRotation().equals(quat1)).toBeTruthy();
});

test('Node#getWorldRotation and Node#setWorldRotation', () => {
    expect(root.getWorldRotation().equals(Quat.IDENTITY)).toBeTruthy();

    root.setWorldRotation(quat1);
    expect(root.getLocalRotation().equals(quat1)).toBeTruthy();
    expect(root.getWorldRotation().equals(quat1)).toBeTruthy();

    root.addChild(child);
    expect(child.getLocalRotation().equals(Quat.IDENTITY)).toBeTruthy();
    expect(child.getWorldRotation().equals(quat1)).toBeTruthy();

    child.setWorldRotation(quat2);
    expect(child.getWorldRotation().equals(quat2)).toBeTruthy();
});

test('Node#getLocalEulerAngle and Node#setLocalEulerAngle', () => {

    expect(root.getLocalEulerAngle().equals(Vec3.ZERO)).toBeTruthy();

    root.setLocalEulerAngle(vec1);
    expect(root.getLocalEulerAngle().equals(vec1)).toBeTruthy();
});

test('Node#getWorldEulerAngle and Node#getWorldEulerAngle', () => {
    expect(root.getWorldEulerAngle().equals(Vec3.ZERO)).toBeTruthy();

    root.setWorldEulerAngle(vec1);
    expect(root.getLocalEulerAngle().equals(vec1)).toBeTruthy();
    expect(root.getWorldEulerAngle().equals(vec1)).toBeTruthy();

    root.addChild(child);
    expect(child.getLocalEulerAngle().equals(Vec3.ZERO)).toBeTruthy();
    expect(child.getWorldEulerAngle().equals(vec1)).toBeTruthy();

    child.setWorldEulerAngle(vec2);
    expect(child.getWorldEulerAngle().equals(vec2)).toBeTruthy();
});

test('Node#getLocalScale and Node#setLocalScale', () => {
    expect(root.getLocalScale().equals(Vec3.ONE)).toBeTruthy();

    root.setLocalScale(vec1);
    expect(root.getLocalScale().equals(vec1)).toBeTruthy();

    root.addChild(child);
    expect(child.getLocalScale().equals(Vec3.ONE)).toBeTruthy();
});

test('Node#getLocalTransform and Node#setLocalTransform', () => {
    const mat1 = new Mat4().setTRS(vec1, quat1, vec2);

    expect(root.getLocalTransform().equals(Mat4.IDENTITY)).toBeTruthy();

    root.setLocalTransform(mat1);

    expect(root.getLocalTransform().equals(mat1)).toBeTruthy();
    expect(root.getLocalPosition().equals(vec1)).toBeTruthy();
    expect(root.getLocalRotation().equals(quat1)).toBeTruthy();
    expect(root.getLocalScale().equals(vec2)).toBeTruthy();
});

test('Node#getWorldTransform and Node#setWorldTransform', () => {
    const mat1 = new Mat4().setTRS(vec1, quat1, vec2);
    const mat2 = new Mat4().setTRS(vec3, quat2, vec4);

    expect(root.getWorldTransform().equals(Mat4.IDENTITY)).toBeTruthy();

    root.setWorldTransform(mat1);

    console.log('111', root.getWorldRotation());
    console.log('111', root.getLocalRotation());

    expect(root.getLocalPosition().equals(vec1)).toBeTruthy();
    expect(root.getLocalRotation().equals(quat1)).toBeTruthy();
    expect(root.getLocalScale().equals(vec2)).toBeTruthy();
    expect(root.getWorldTransform().equals(mat1)).toBeTruthy();

    root.addChild(child);
    expect(child.getWorldTransform().equals(mat1)).toBeTruthy();

    child.setWorldTransform(mat2);
    console.log('position: ', child.getWorldPosition(), mat2.getTranslation());
    console.log('rotation: ', child.getWorldRotation().getEulerAngle(), mat2.getRotation().getEulerAngle());
    console.log('scale: ', child.getLocalScale(), mat2.getScale());
    expect(child.getWorldPosition().equals(vec3)).toBeTruthy();
    expect(child.getWorldRotation().equals(quat2)).toBeTruthy();
    expect(child.getLocalScale().equals(vec4)).toBeTruthy();
    expect(child.getWorldTransform().equals(mat2)).toBeTruthy();
});

import Vec3 from "../math/vec3";
import Mat3 from "../math/mat3";
import Mat4 from "../math/mat4";
import Quat from "../math/quat";

const vecA = new Vec3();
const matA = new Mat4();
const quatA = new Quat();
const quatB = new Quat();

export default class Node {
    public static readonly DEFAULT_NAME = "Untitled";
    public name: string;
    public parent: Node;
    public children: Node[];
    public position = new Vec3();
    public rotation = new Quat();
    public scale = new Vec3(1, 1, 1);
    public worldMatrix = new Mat4();
    public localMatrix = new Mat4();
    public normalMatrix = new Mat3();
    public autoUpdate = true;
    public enabled = true;

    constructor() {
        this.name = Node.DEFAULT_NAME;
        this.parent = null;
        this.children = [];
    }

    get right() {
        return this.worldMatrix.transformVector(Vec3.RIGHT, vecA);
    }

    get left() {
        return this.worldMatrix.transformVector(Vec3.LEFT, vecA);
    }

    get up() {
        return this.worldMatrix.transformVector(Vec3.UP, vecA);
    }

    get down() {
        return this.worldMatrix.transformVector(Vec3.DOWN, vecA);
    }

    get forward() {
        return this.worldMatrix.transformVector(Vec3.FORWARD, vecA);
    }

    get back() {
        return this.worldMatrix.transformVector(Vec3.BACK, vecA);
    }

    public translate(vector: Vec3) {
        this.getWorldPosition(vecA);
        vecA.add(vector);
        return this.setWorldPosition(vecA);
    }

    public translateLocal(vector: Vec3) {
        this.position.add(vector);
        return this;
    }

    public rotate(vector: Vec3) {
        quatA.setFromEulerAngles(vector);
        return this.setWorldRotation(quatA);
    }

    public rotateLocal(vector: Vec3) {
        quatA.setFromEulerAngles(vector);
        this.rotation.mul(quatA);
        return this;
    }

    public lookAt(target: Vec3) {
        this.getWorldPosition(vecA);
        matA.setLookAt(vecA, target, this.up);
        quatA.setFromMat4(matA);
        this.setWorldRotation(quatA);
    }

    public getWorldPosition(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        this.updateWorldMatrix();
        return this.worldMatrix.getTranslation(res);
    }

    public setWorldPosition(worldPosition: Vec3) {
        if (this.parent === null) {
            this.position.copy(worldPosition);
        } else {
            matA.copy(this.parent.worldMatrix).invert();
            matA.transformPoint(worldPosition, this.position);
        }
        return this;
    }

    public getLocalPosition(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        this.updateLocalMatrix();
        return this.localMatrix.getTranslation(res);
    }

    public setLocalPosition(localPosition: Vec3) {
        this.position.copy(localPosition);
        return this;
    }

    public getWorldEulerAngles(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        this.updateWorldMatrix();
        return this.worldMatrix.getEulerAngles(res);
    }

    public setWorldEulerAngles(worldEulerAngles: Vec3) {
        if (this.parent === null) {
            this.rotation.setFromEulerAngles(worldEulerAngles);
        } else {
            quatA.setFromEulerAngles(worldEulerAngles);
            this.setWorldRotation(quatA);
        }
    }

    public getLocalEulerAngles(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        return this.rotation.getEulerAngles(res);
    }

    public setLocalEulerAngles(localEulerAngles: Vec3) {
        this.rotation.setFromEulerAngles(localEulerAngles);
        return this;
    }

    public getWorldRotation(res?: Quat) {
        if (res === undefined) res = new Quat();
        this.updateWorldMatrix();
        return res.setFromMat4(this.worldMatrix);
    }

    public setWorldRotation(worldRotation: Quat) {
        if (this.parent === null) {
            this.rotation.copy(worldRotation);
        } else {
            quatA.copy(this.parent.getWorldRotation()).invert();
            quatB.mul2(quatA, worldRotation);
            this.rotation.mul2(quatB, this.rotation);
        }
        return this;
    }

    public getLocalRotation(res?: Quat) {
        if (res === undefined) res = new Quat();
        return res.copy(this.rotation);
    }

    public setLocalRotation(localRotation: Quat) {
        this.rotation.copy(localRotation);
    }

    public getLocalScale(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        return res.copy(this.scale);
    }

    public setLocalScale(localScale: Vec3) {
        this.scale.copy(localScale);
        return this;
    }

    public addChild(node: Node): Node {
        if (node.parent !== null) {
            console.error("Node#addChild: node has already parented.");
            return this;
        }

        node.parent = this;
        this.children.push(node);
        return this;
    }

    public removeChild(node: Node): Node {
        const index = this.children.indexOf(node);

        if (index > -1) {
            node.parent = null;
            this.children.splice(index, 1);
        }

        return this;
    }

    public updateLocalMatrix() {
        this.localMatrix.setTRS(this.position, this.rotation, this.scale);
    }

    public updateWorldMatrix(force: boolean = false) {
        this.updateLocalMatrix();

        if (this.autoUpdate || force) {
            if (this.parent === null) {
                this.worldMatrix.copy(this.localMatrix);
            } else {
                this.worldMatrix.mul2(this.parent.worldMatrix, this.localMatrix);
            }

            force = true;
        }

        for (const child of this.children) {
            child.updateWorldMatrix(force);
        }
    }

    public traverse(callback: (node: Node) => void) {
        callback(this);
        for (const child of this.children)
            callback(child);
    }

    public clone() {

    }

    public toJSON() {

    }
}

import Vec3 from "math/vec3";
import Mat3 from "math/mat3";
import Mat4 from "math/mat4";
import Quat from "math/quat";
import EventEmitter from "core/event-emitter";
import { Script, Scriptable } from "script/script";

const vecA = new Vec3();
const vecB = new Vec3();
const matA = new Mat4();
const quatA = new Quat();
const quatB = new Quat();
const quatC = new Quat();

export default class Node extends EventEmitter implements Scriptable<Node> {
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
    public scripts = [] as Array<Script<Node>>;

    constructor() {
        super();
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

    public translate(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.translate2(vecB);
    }

    public translate2(vector: Vec3) {
        this.getWorldPosition(vecA);
        vecA.add(vector);
        return this.setWorldPosition(vecA);
    }

    public translateLocal(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.translateLocal2(vecB);
    }

    public translateLocal2(vector: Vec3) {
        this.position.add(vector);
        return this;
    }

    public rotate(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.rotate2(vecB);
    }

    public rotate2(vector: Vec3) {
        this.getWorldRotation(quatB);
        quatA.setFromEulerAngles(vector);
        quatA.mul(quatB);
        return this.setWorldRotation(quatA);
    }

    public rotateLocal(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.rotateLocal2(vecB);
    }

    public rotateLocal2(vector: Vec3) {
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

    public setWorldPosition(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.setWorldPosition2(vecB);
    }

    public setWorldPosition2(worldPosition: Vec3) {
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

    public setLocalPosition(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.setLocalPosition2(vecB);
    }

    public setLocalPosition2(localPosition: Vec3) {
        this.position.copy(localPosition);
        return this;
    }

    public getWorldEulerAngles(res?: Vec3) {
        if (res === undefined) res = new Vec3();
        this.updateWorldMatrix();
        return this.worldMatrix.getEulerAngles(res);
    }

    public setWorldEulerAngles(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.setWorldEulerAngles2(vecB);
    }

    public setWorldEulerAngles2(worldEulerAngles: Vec3) {
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

    public setLocalEulerAngles(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.setLocalEulerAngles2(vecB);
    }

    public setLocalEulerAngles2(localEulerAngles: Vec3) {
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
            quatB.copy(this.parent.getWorldRotation()).invert();
            quatC.mul2(quatB, worldRotation);
            this.rotation.copy(quatC);
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

    public setLocalScale(x: number, y: number, z: number) {
        vecB.set(x, y, z);
        return this.setLocalScale2(vecB);
    }

    public setLocalScale2(localScale: Vec3) {
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

        for (const script of this.scripts) {
            this.execScript(script);
        }

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

    public addScript(script: Script<Node>) {
        const index = this.scripts.indexOf(script);

        if (index !== -1) return this;

        script.attach(this);
        this.scripts.push(script);

        if (this.enabled && script.enabled) {
            script.initialized = true;
        }

        return this;
    }

    public removeScript(script: Script<Node>) {
        const index = this.scripts.indexOf(script);

        if (index !== -1) return this;

        script.detach();
        this.scripts.splice(index, 1);

        return this;
    }

    public execScript(script: Script<Node>) {
        if (!this.enabled) return;

        script.initialized = true;
        script.started = true;
        script.onUpdate();
    }
}

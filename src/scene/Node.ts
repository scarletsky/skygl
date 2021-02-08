import { Vec3 } from '../math/Vec3';
import { Quat } from '../math/Quat';
import { Mat4 } from '../math/Mat4';
import { BaseObject } from '../core/BaseObject';
import { Cache } from '../core/Cache';

const vecA = new Vec3();
const quatA = new Quat();
const matA = new Mat4();

export class Node extends BaseObject {
    public cache: Cache<Node>;
    public localPosition: Vec3;
    public localRotation: Quat;
    public localEulerAngle: Vec3;
    public localScale: Vec3;
    public localTransform: Mat4;
    public worldPosition: Vec3;
    public worldRotation: Quat;
    public worldEulerAngle: Vec3;
    public worldTransform: Mat4;
    public enabled: boolean;
    public parent: Node | null;
    public children: Node[];
    public _dirtyLocal: boolean;
    public _dirtyWorld: boolean;

    constructor() {
        super();
        this.cache = new Cache();
        this.localPosition = new Vec3();
        this.localRotation = new Quat();
        this.localEulerAngle = new Vec3();
        this.localScale = new Vec3(1, 1, 1);
        this.localTransform = new Mat4();
        this.worldPosition = new Vec3();
        this.worldRotation = new Quat();
        this.worldEulerAngle = new Vec3();
        this.worldTransform = new Mat4();
        this.parent = null;
        this.enabled = true;
        this.children = [];

        this._dirtyLocal = false;
        this._dirtyWorld = true;
    }

    addChild(node: Node) {
        if (node.parent) {
            console.error('[Node] Can not addChild');
            return this;
        }

        this.children.push(node);
        node.parent = this;

        return this;
    }

    removeChild(node: Node) {
        const index = this.children.indexOf(node);

        if (index === -1) {
            console.error('[Node] Can not removeChild');
            return false;
        }

        this.children.splice(index, 1);
        node.parent = null;

        return true;
    }

    getWorldPosition(res = new Vec3()) {
        return this.getWorldTransform().getTranslation(res);
    }

    setWorldPosition(value: Vec3) {
        this.worldPosition.copy(value);
        this._dirtyWorld = true;

        return this;
    }

    getLocalPosition(res = new Vec3()) {
        return this.getLocalTransform().getTranslation(res);
    }

    setLocalPosition(value: Vec3) {
        this.localPosition.copy(value);
        this._dirtyLocal = true;

        return this;
    }

    getWorldRotation(res = new Quat()) {
        return this.getWorldTransform().getRotation(res);
    }

    setWorldRotation(value: Quat) {
        this.worldRotation.copy(value);
        this._dirtyWorld = true;

        return this;
    }

    getLocalRotation(res = new Quat()) {
        return this.getLocalTransform().getRotation(res);
    }

    setLocalRotation(value: Quat) {
        this.localRotation.copy(value);
        this._dirtyLocal = true;

        return this;
    }

    getWorldEulerAngle(res = new Vec3()) {
        this.getWorldTransform().getRotation(quatA);
        return quatA.getEulerAngle(res);
    }

    setWorldEulerAngle(x: Vec3 | number, y?: number, z?: number) {
        if (x instanceof Vec3) {
            this.worldEulerAngle.copy(x);
        } else {
            this.worldEulerAngle.set(x, y as number, z as number);
        }

        this._dirtyWorld = true;

        return this;
    }

    getLocalEulerAngle(res = new Vec3()) {
        this.getLocalTransform().getRotation(quatA);
        return quatA.getEulerAngle(res);
    }

    setLocalEulerAngle(x: Vec3 | number, y?: number, z?: number) {
        if (x instanceof Vec3) {
            this.localEulerAngle.copy(x);
        } else {
            this.localEulerAngle.set(x, y as number, z as number);
        }

        this._dirtyLocal = true;

        return this;
    }

    getLocalScale(res = new Vec3()) {
        return this.getLocalTransform().getScale(res);
    }

    setLocalScale(value: Vec3) {
        this.localScale.copy(value);
        this._dirtyLocal = true;

        return this;
    }

    getLocalTransform() {
        if (this._dirtyLocal) {
            this.localTransform.setTRS(this.localPosition, this.localRotation, this.localScale);
            this._dirtyLocal = false;
        }

        return this.localTransform;
    }

    setLocalTransform(value: Mat4) {
        this.localTransform.copy(value);
        this.localTransform.getTRS(this.localPosition, this.localRotation, this.localScale);
        this.localRotation.getEulerAngle(this.localEulerAngle);
        this._dirtyLocal = true;

        return this;
    }

    getWorldTransform() {
        if (!this._dirtyLocal && !this._dirtyWorld) {
            return this.worldTransform;
        }

        this._sync();

        return this.worldTransform;
    }

    syncHierarchy() {
        if (!this.enabled) return;

        this.getWorldTransform();

        this.children.forEach(node => node.syncHierarchy());
    }

    private _sync() {
        if (this._dirtyLocal) {
            this.getLocalTransform();
        }

        if (this._dirtyWorld) {
            if (this.parent === null) {
                this.worldTransform.copy(this.localTransform);
            } else {
                this.parent.getWorldTransform();
                this.worldTransform.mul2(this.parent.worldTransform, this.localTransform);
            }
            this._dirtyWorld = false;
        }
    }
}

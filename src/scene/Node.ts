import { Vec3 } from '../math/Vec3';
import { Quat } from '../math/Quat';
import { Mat4 } from '../math/Mat4';
import { BaseObject } from '../core/BaseObject';
import { Cache } from '../core/Cache';

const vecA = new Vec3();
const vecB = new Vec3();
const quatA = new Quat();
const matA = new Mat4();
const matB = new Mat4();

export class Node extends BaseObject {
    public cache: Cache<Node>;
    public localPosition: Vec3;
    public localRotation: Quat;
    public localScale: Vec3;
    public localTransform: Mat4;
    public worldPosition: Vec3;
    public worldRotation: Quat;
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
        this.localScale = new Vec3(1, 1, 1);
        this.localTransform = new Mat4();
        this.worldPosition = new Vec3();
        this.worldRotation = new Quat();
        this.worldTransform = new Mat4();
        this.parent = null;
        this.enabled = true;
        this.children = [];

        this._dirtyLocal = true;
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

    setWorldPosition(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            vecA.copy(x);
        } else {
            vecA.set(x, y, z);
        }

        if (this.parent === null) {
            this.localPosition.copy(vecA);
        } else {
            matA.copy(this.parent.getWorldTransform()).invert();
            matA.transformPoint(vecA, this.localPosition);
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalPosition(res = new Vec3()) {
        return res.copy(this.localPosition);
    }

    setLocalPosition(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            vecA.copy(x);
        } else {
            vecA.set(x, y, z);
        }

        this.localPosition.copy(vecA);
        this._dirtifyLocal();

        return this;
    }

    getWorldRotation(res = new Quat()) {
        return this.getWorldTransform().getRotation(res);
    }

    setWorldRotation(value: Quat) {

        if (this.parent === null) {
            this.localRotation.copy(value);
        } else {
            this.parent.getWorldRotation(quatA);
            quatA.invert();
            this.localRotation.mul2(quatA, value)
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalRotation(res = new Quat()) {
        return res.copy(this.localRotation);
    }

    setLocalRotation(value: Quat) {
        this.localRotation.copy(value);
        this._dirtifyLocal();

        return this;
    }

    getWorldEulerAngle(res = new Vec3()) {
        this.getWorldTransform().getRotation(quatA);
        return quatA.getEulerAngle(res);
    }

    setWorldEulerAngle(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            this.localRotation.setEulerAngle(x.x, x.y, x.z);
        } else {
            this.localRotation.setEulerAngle(x, y, z);
        }

        if (this.parent) {
            this.parent.getWorldRotation(quatA);
            quatA.invert();
            this.localRotation.mul2(quatA, this.localRotation);
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalEulerAngle(res = new Vec3()) {
        this.localRotation.getEulerAngle(res);
        return res;
    }

    setLocalEulerAngle(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            this.localRotation.setEulerAngle(x.x, x.y, x.z);
        } else {
            this.localRotation.setEulerAngle(x, y, z);
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalScale(res = new Vec3()) {
        return res.copy(this.localScale);
    }

    setLocalScale(x: Vec3 | number, y = 1, z = 1) {
        if (x instanceof Vec3) {
            this.localScale.copy(x);
        } else {
            this.localScale.set(x, y, z);
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalTransform() {
        if (this._dirtyLocal) {
            this.localTransform.setTRS(this.localPosition, this.localRotation, this.localScale);
            this._dirtyLocal = false;
        }

        return this.localTransform;
    }

    setLocalTransform(transform: Mat4) {
        this.localTransform.copy(transform);
        this.localTransform.getTRS(this.localPosition, this.localRotation, this.localScale);
        this._dirtifyWorld();

        return this;
    }

    getWorldTransform() {
        if (!this._dirtyLocal && !this._dirtyWorld) {
            return this.worldTransform;
        }

        this._sync();

        return this.worldTransform;
    }

    setWorldTransform(transform: Mat4) {
        if (this.parent === null) {
            this.setLocalTransform(transform);
        } else {
            transform.getTRS(vecA, quatA, vecB);
            this.setWorldPosition(vecA);
            this.setWorldRotation(quatA);
            this.setLocalScale(vecB);
        }

        return this;
    }

    syncHierarchy() {
        if (!this.enabled) return;

        this._sync();

        this.children.forEach(node => node.syncHierarchy());
    }

    private _dirtifyLocal() {
        if (!this._dirtyLocal) {
            this._dirtyLocal = true;
            this._dirtifyWorld();
        }
    }

    private _dirtifyWorld() {
        if (!this._dirtyWorld) {
            this._dirtyWorld = true;
        }
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

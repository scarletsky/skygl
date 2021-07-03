import { Nullable, TraverseCallback } from 'types';
import { isFunction } from '../utils';
import { Vec3 } from '../math/Vec3';
import { Quat } from '../math/Quat';
import { Mat4 } from '../math/Mat4';
import { BaseObject, BaseObjectOptions } from '../core/BaseObject';

const vecA = new Vec3();
const vecB = new Vec3();
const quatA = new Quat();
const quatB = new Quat();
const matA = new Mat4();
const matB = new Mat4();

export interface NodeOptions extends BaseObjectOptions {
    position: [number, number, number];
    rotation: [number, number, number, number];
    scale: [number, number, number];
}

export class Node extends BaseObject {
    public localPosition: Vec3;
    public localRotation: Quat;
    public localScale: Vec3;
    public localMatrix: Mat4;
    public worldPosition: Vec3;
    public worldRotation: Quat;
    public worldMatrix: Mat4;
    public enabled: boolean;
    public parent: Nullable<Node>;
    public children: Node[];
    public _dirtyLocal: boolean;
    public _dirtyWorld: boolean;

    constructor(options: Partial<NodeOptions> = {}) {
        super();
        this.localPosition = new Vec3();
        this.localRotation = new Quat();
        this.localScale = new Vec3(1, 1, 1);
        this.localMatrix = new Mat4();
        this.worldPosition = new Vec3();
        this.worldRotation = new Quat();
        this.worldMatrix = new Mat4();
        this.parent = null;
        this.enabled = true;
        this.children = [];

        this._dirtyLocal = true;
        this._dirtyWorld = true;
        this.fromJSON(options);
    }

    addChild(node: Node) {
        if (node.parent) {
            console.error('[Node] Can not addChild');
            return false;
        }

        this.children.push(node);
        node.parent = this;

        return true;
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
        return this.getWorldMatrix().getTranslation(res);
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
            matA.copy(this.parent.getWorldMatrix()).invert();
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
        return this.getWorldMatrix().getRotation(res);
    }

    setWorldRotation(x: Quat | number, y = 0, z = 0, w = 1) {
        if (x instanceof Quat) {
            quatA.copy(x);
        } else {
            quatA.set(x, y, z, w);
        }

        if (this.parent === null) {
            this.localRotation.copy(quatA);
        } else {
            this.parent.getWorldRotation(quatB);
            quatB.invert();
            this.localRotation.mul2(quatB, quatA)
        }

        this._dirtifyLocal();

        return this;
    }

    getLocalRotation(res = new Quat()) {
        return res.copy(this.localRotation);
    }

    setLocalRotation(x: Quat | number, y = 0, z = 0, w = 1) {
        if (x instanceof Quat) {
            this.localRotation.copy(x);
        } else {
            this.localRotation.set(x, y, z, w);
        }

        this._dirtifyLocal();

        return this;
    }

    getWorldEulerAngle(res = new Vec3()) {
        this.getWorldMatrix().getRotation(quatA);
        return quatA.getEulerAngle(res);
    }

    setWorldEulerAngle(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            this.localRotation.setFromEulerAngle(x.x, x.y, x.z);
        } else {
            this.localRotation.setFromEulerAngle(x, y, z);
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
            this.localRotation.setFromEulerAngle(x.x, x.y, x.z);
        } else {
            this.localRotation.setFromEulerAngle(x, y, z);
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

    getLocalMatrix() {
        if (this._dirtyLocal) {
            this.localMatrix.setTRS(this.localPosition, this.localRotation, this.localScale);
            this._dirtyLocal = false;
        }

        return this.localMatrix;
    }

    setLocalMatrix(transform: Mat4) {
        this.localMatrix.copy(transform);
        this.localMatrix.getTRS(this.localPosition, this.localRotation, this.localScale);
        this._dirtifyWorld();

        return this;
    }

    getWorldMatrix() {
        if (!this._dirtyLocal && !this._dirtyWorld) {
            return this.worldMatrix;
        }

        this._sync();

        return this.worldMatrix;
    }

    setWorldMatrix(transform: Mat4) {
        if (this.parent === null) {
            this.setLocalMatrix(transform);
        } else {
            transform.getTRS(vecA, quatA, vecB);
            this.setWorldPosition(vecA);
            this.setWorldRotation(quatA);
            this.setLocalScale(vecB);
        }

        return this;
    }

    syncHierarchy(callback?: TraverseCallback<Node>) {
        if (!this.enabled) return;

        this._sync();

        if (isFunction(callback)) callback(this);

        this.children.forEach(node => node.syncHierarchy(callback));
    }

    fromJSON(options: Partial<NodeOptions>) {
        if (options.name) this.name = options.name;
        if (options.uid) this.uid = options.uid;
        if (options.position) this.setLocalPosition(...options.position);
        if (options.rotation) this.setLocalRotation(...options.rotation);
        if (options.scale) this.setLocalScale(...options.scale);
    }

    toJSON(): NodeOptions {
        return {
            uid: this.uid,
            name: this.name,
            position: this.getLocalPosition().toJSON(),
            rotation: this.getLocalRotation().toJSON(),
            scale: this.getLocalScale().toJSON(),
        };
    }

    traverse(callback: TraverseCallback<Node>) {
        callback(this);
        this.children.forEach(callback);
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
            this.getLocalMatrix();
        }

        if (this._dirtyWorld) {
            if (this.parent === null) {
                this.worldMatrix.copy(this.localMatrix);
            } else {
                this.parent.getWorldMatrix();
                this.worldMatrix.mul2(this.parent.worldMatrix, this.localMatrix);
            }
            this._dirtyWorld = false;
        }
    }
}

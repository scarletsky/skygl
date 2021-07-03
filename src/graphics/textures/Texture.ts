import { BaseObject, BaseObjectOptions } from 'core/BaseObject';
import { Device } from 'graphics/Device';
import { Nullable } from 'types';

export interface TextureOptions extends BaseObjectOptions {

}

export class Texture extends BaseObject {
    public _glTextureId: Nullable<WebGLTexture>;

    constructor(options: Partial<TextureOptions> = {}) {
        super();
        this._glTextureId = null;
    }

    onGLCreate(device: Device) {
        const gl = device.gl as WebGLRenderingContext;
    }

    onGLDelete(device: Device) {
        const gl = device.gl as WebGLRenderingContext;
    }

    onGLBind(device: Device) {

    }

    onGLUnbind(device: Device) {

    }

    setSource() {

    }

    destroy() {

    }

    fromJSON(options: Partial<TextureOptions>) {

    }

    toJSON() {
        return Object.assign(super.toJSON(), {

        });
    }
}

import { BaseObject, BaseObjectOptions } from 'core/BaseObject';
import { Device } from 'graphics/Device';
import {
    REPEAT,
    CLAMP_TO_EDGE,
    MIRRORED_REPEAT,
    TEXTURE_2D,
    LINEAR,
    TEXTURE_WRAP_S,
    TEXTURE_WRAP_T,
    TEXTURE_MIN_FILTER,
    ALPHA,
    NEAREST_MIPMAP_LINEAR,
    UNPACK_FLIP_Y_WEBGL,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL,
    RGB
} from 'graphics/constants';
import { Nullable } from 'types';
import { isBoolean, isNumber, isPowerOfTwo } from 'utils';

export enum TextureFormat {
    RGB = 0,
    RGBA,
    LUMINANCE,
    LUMINANCE_ALPHA,
    ALPHA,
}

export enum TextureInternalFormat {
    RGB = 0,
    RGBA,
    LUMINANCE,
    LUMINANCE_ALPHA,
    ALPHA,
}

export enum TextureType {
    UNSIGNED_BYTE = 0,
    UNSIGNED_SHORT_5_6_5,
    UNSIGNED_SHORT_4_4_4_4,
    UNSIGNED_SHORT_5_5_5_1,
}

export interface TextureOptions extends BaseObjectOptions {
    format: number;
    internalFormat: number;
    wrapS: number;
    wrapT: number;
    minFilter: number;
    magFilter: number;
    mipmap: boolean;
    flipY: boolean;
}

export class Texture extends BaseObject {
    public width = 0;
    public height = 0;
    public wrapS = REPEAT;
    public wrapT = REPEAT;
    public minFilter = NEAREST_MIPMAP_LINEAR;
    public magFilter = LINEAR;
    public mipmap = true;
    public flipY = false;
    public premultiplyAlpha = false;
    public format = RGB;
    public internalFormat = RGB;
    public type = RGB;
    public source = null as Nullable<TexImageSource>;
    public _pot = false;
    public _glTarget = TEXTURE_2D;
    public _glTextureId = null as Nullable<WebGLTexture>;
    public _glFormat = -1;
    public _glInternalFormat = -1;
    // NOTE: these fields are used for cached.
    public _glType = -1;
    public _glWrapS = -1;
    public _glWrapT = -1;
    public _glMinFilter = -1;
    public _glMagFilter = -1;
    public _glMipmap = false;
    public _glFlipY = false;
    public _glPremultiplyAlpha = false;

    onGLCreate(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        if (!this._glTextureId) {
            this._glTextureId = gl.createTexture();
        }

        return true;
    }

    onGLDelete(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        if (this._glTextureId) {
            gl.deleteBuffer(this._glTextureId);
            this._glTextureId = null;
        }

        return true;
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        device.setActiveTexture(device.activeTexture);
        gl.bindTexture(this._glTarget, this._glTextureId);

        if (this._glFormat !== this.format) this._glFormat = this.format;
        if (this._glInternalFormat !== this.internalFormat) this._glInternalFormat = this.internalFormat;
        if (this._glType !== this.type) this._glType = this.type;

        if (this._glWrapS !== this.wrapS) {
            this._glWrapS = this.wrapS;
            gl.texParameteri(this._glTarget, TEXTURE_WRAP_S, this._glWrapS);
        }

        if (this._glWrapT !== this.wrapT) {
            this._glWrapT = this.wrapT;
            gl.texParameteri(this._glTarget, TEXTURE_WRAP_T, this._glWrapT);
        }

        if (this._glMinFilter !== this.minFilter) {
            this._glMinFilter = this.minFilter;
            gl.texParameteri(this._glTarget, TEXTURE_MIN_FILTER, this._glMinFilter);
        }

        if (this._glMagFilter !== this.magFilter) {
            this._glMagFilter = this.magFilter;
            gl.texParameteri(this._glTarget, TEXTURE_MIN_FILTER, this._glMagFilter);
        }

        if (this._glFlipY !== this.flipY) {
            this._glFlipY = this.flipY;
            gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, this.flipY);
        }

        if (this._glPremultiplyAlpha !== this.premultiplyAlpha) {
            this._glPremultiplyAlpha = this.premultiplyAlpha;
            gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        }
    }

    onGLUnbind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        gl.bindTexture(this._glTarget, null);
    }

    setSource(..._params: any[]) {

    }

    destroy() {

    }

    fromJSON(options: Partial<TextureOptions>) {
        super.fromJSON(options);
        if (isNumber(options.wrapS)) this.wrapS = options.wrapS;
        if (isNumber(options.wrapT)) this.wrapT = options.wrapT;
        if (isNumber(options.minFilter)) this.minFilter = options.minFilter;
        if (isNumber(options.magFilter)) this.magFilter = options.magFilter;
        if (isBoolean(options.mipmap)) this.mipmap = options.mipmap;
        if (isBoolean(options.flipY)) this.flipY = options.flipY;
    }

    toJSON(): TextureOptions {
        return Object.assign(super.toJSON(), {
            wrapS: this.wrapS,
            wrapT: this.wrapT,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            mipmap: this.mipmap
        });
    }
}

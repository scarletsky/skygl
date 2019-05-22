import { TypedArray } from "./buffer";
import { powerOfTwo } from "math/math";
import Device from "./device";
import { IResize } from "interfaces";

let idCounter = 0;

export type MipObject = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | TypedArray;
export type TextureLevels = MipObject[] | Array<MipObject[]>;

export interface TextureParameters {
    name?: string;
    width?: number;
    height?: number;
    depth?: number;
    target?: number;
    format?: number;
    internalFormat?: number;
    internalFormatType?: number;
    wrapS?: number;
    wrapT?: number;
    wrapR?: number;
    minFilter?: number;
    magFilter?: number;
    anisotropy?: number;
    flipY?: boolean;
    mipmaps?: boolean;
    [key: string]: any;
}

export default class Texture implements IResize {
    // target
    public static readonly TEXTURE_2D = 0x0de1;
    public static readonly TEXTURE_CUBE_MAP = 0x8513;
    public static readonly TEXTURE_BINDING_CUBE_MAP = 0x8514;
    public static readonly TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    public static readonly TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
    public static readonly TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
    public static readonly TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
    public static readonly TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
    public static readonly TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a;
    public static readonly MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c;

    // wrap mode
    public static readonly CLAMP_TO_EDGE = 0x812f;
    public static readonly REPEAT = 0x2901;
    public static readonly MIRRORED_REPEAT = 0x8370;

    // filter mode
    public static readonly LINEAR = 0x2601;
    public static readonly NEAREST = 0x2600;
    public static readonly NEAREST_MIPMAP_NEAREST = 0x2700;
    public static readonly LINEAR_MIPMAP_NEAREST = 0x2701;
    public static readonly NEAREST_MIPMAP_LINEAR = 0x2702;
    public static readonly LINEAR_MIPMAP_LINEAR = 0x2703;

    // filter anisotropy
    public static readonly TEXTURE_MAX_ANISOTROPY_EXT = 0x84fe;
    public static readonly MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84ff;

    // DXT formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
    public static readonly COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83f0;
    public static readonly COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83f1;
    public static readonly COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83f2;
    public static readonly COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83f3;

    // ATC formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_atc/
    public static readonly COMPRESSED_RGB_ATC_WEBGL = 0x8c92;
    public static readonly COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8c93;
    public static readonly COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87ee;

    // PVR formats, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    public static readonly COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8c00;
    public static readonly COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8c01;
    public static readonly COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8c02;
    public static readonly COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8c03;

    // ETC1 format, from:
    // http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/
    public static readonly COMPRESSED_RGB_ETC1_WEBGL = 0x8d64;

    // GL1 format
    public static readonly ALPHA = 0x1906;
    public static readonly RGB = 0x1907;
    public static readonly RGBA = 0x1908;
    public static readonly LUMINANCE = 0x1909;
    public static readonly LUMINANCE_ALPHA = 0x190a;
    // GL2 format
    public static readonly RED_INTEGER = 0x8d94;
    public static readonly RGB_INTEGER = 0x8d98;
    public static readonly RGBA_INTEGER = 0x8d99;
    public static readonly RG_INTEGER = 0x8228;
    public static readonly RED = 0x1903;
    public static readonly DEPTH_COMPONENT = 0x1902;

    // GL2 internal format
    public static readonly R8 = 0x8229;
    public static readonly R8UI = 0x8232;
    public static readonly RG8 = 0x822b;
    public static readonly RG8UI = 0x8238;
    public static readonly RGB8 = 0x8f96;
    public static readonly RGB565 = 0x8d62;
    public static readonly RGB9_E5 = 0x8c3d;
    public static readonly RGB8UI = 0x8d7d;
    public static readonly RGBA8 = 0x8058;
    public static readonly RGB5_A1 = 0x8057;
    public static readonly RGBA4 = 0x8056;
    public static readonly RGBA8UI = 0x8d7c;
    public static readonly SRGB8_ALPHA8 = 0x8c43;
    public static readonly SRGB8 = 0x8c41;
    public static readonly DEPTH_COMPONENT16 = 0x81a5;
    public static readonly DEPTH_COMPONENT24 = 0x81a6;
    public static readonly DEPTH_COMPONENT32F = 0x8cac;

    // GL2 internal format HALF FLOAT - FLOAT
    public static readonly R16F = 0x822d;
    public static readonly RG16F = 0x822f;
    public static readonly RGB16F = 0x881b;
    public static readonly RGBA16F = 0x881a;
    public static readonly R11F_G11F_B10F = 0x8c3a; // and UNSIGNED_INT_10F_11F_11F_REV

    // GL2 internal format FLOAT
    public static readonly R32F = 0x822e;
    public static readonly RG32F = 0x8230;
    public static readonly RGB32F = 0x8815;
    public static readonly RGBA32F = 0x8814;

    // GL1 internal format type
    public static readonly UNSIGNED_BYTE = 0x1401;
    public static readonly UNSIGNED_SHORT = 0x1403;
    public static readonly UNSIGNED_SHORT_4_4_4_4 = 0x8033;
    public static readonly UNSIGNED_SHORT_5_5_5_1 = 0x8034;
    public static readonly UNSIGNED_SHORT_5_6_5 = 0x8363;
    public static readonly FLOAT = 0x1406;
    public static readonly HALF_FLOAT_OES = 0x8d61;

    // GL2 internal format type
    public static readonly HALF_FLOAT = 0x140b;
    public static readonly UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b;
    public static readonly UNSIGNED_INT_24_8 = 0x84fa;

    // TODO: support 3d texture
    public id = idCounter++;
    public name = "Untitled";
    public width = 4;
    public height = 4;
    public target = Texture.TEXTURE_2D;
    public wrapS = Texture.REPEAT;
    public wrapT = Texture.REPEAT;
    public wrapR = Texture.REPEAT;
    public minFilter = Texture.LINEAR_MIPMAP_LINEAR;
    public magFilter = Texture.LINEAR;
    public anisotropy = 1;
    public format = Texture.RGBA;
    public internalFormat = Texture.RGBA;
    public internalFormatType = Texture.UNSIGNED_BYTE;
    public flipY = true;
    public mipmaps = true;
    public _levels = [] as TextureLevels;
    public _pot = true;
    public _needsUpload = true;
    public _needsUploadMipmap = true;
    public _glTextureId = null as WebGLTexture;
    [key: string]: any;

    constructor(params: TextureParameters = {}) {
        this.setParameters(params);
    }

    get compressed() {
        switch (this.internalFormat) {
            case Texture.COMPRESSED_RGB_S3TC_DXT1_EXT:
            case Texture.COMPRESSED_RGBA_S3TC_DXT1_EXT:
            case Texture.COMPRESSED_RGBA_S3TC_DXT3_EXT:
            case Texture.COMPRESSED_RGBA_S3TC_DXT5_EXT:
            case Texture.COMPRESSED_RGB_ATC_WEBGL:
            case Texture.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL:
            case Texture.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL:
            case Texture.COMPRESSED_RGB_PVRTC_4BPPV1_IMG:
            case Texture.COMPRESSED_RGB_PVRTC_2BPPV1_IMG:
            case Texture.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG:
            case Texture.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG:
            case Texture.COMPRESSED_RGB_ETC1_WEBGL:
                return true;
            default:
                return false;
        }
    }

    public setParameters(params: TextureParameters) {
        for (const key in params) {
            const value = params[key];
            this[key] = value;
        }
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public verifySource(source: MipObject) {
         if (source instanceof HTMLImageElement ||
            source instanceof HTMLCanvasElement ||
            source instanceof HTMLVideoElement) {
            this.width = source.width;
            this.height = source.height;
            this._pot = powerOfTwo(this.width) && powerOfTwo(this.height);
        }
    }

    public setSource(source: MipObject) {
        this.verifySource(source);
        this._levels[0] = source;
    }

    public upload() {
        this._needsUpload = true;
    }

    public apply(device: Device, textureUnit?: number) {
        const gl = device.gl;

        if (textureUnit === undefined) {
            textureUnit = device.textureUnit;
        }

        if (device.textureUnits[textureUnit][this.target] === this) {
            return;
        }

        if (!this._glTextureId) {
            this._glTextureId = gl.createTexture();
        }

        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(this.target, this._glTextureId);

        if (this._needsUpload) {
            this.applyParameters(device);
            this.applyTexImage2D(device);
            this._needsUpload = false;
        }

        device.textureUnits[textureUnit][this.target] = this;
    }

    public applyParameters(device: Device) {
        const gl = device.gl;

        if (!this._pot) {
            this.wrapS = Texture.CLAMP_TO_EDGE;
            this.wrapT = Texture.CLAMP_TO_EDGE;

            if (this.minFilter === Texture.LINEAR_MIPMAP_LINEAR ||
                this.minFilter === Texture.LINEAR_MIPMAP_NEAREST) {
                this.minFilter = Texture.LINEAR;
            }
        }
        gl.texParameteri(this.target, gl.TEXTURE_MAG_FILTER, this.magFilter);
        gl.texParameteri(this.target, gl.TEXTURE_MIN_FILTER, this.minFilter);

        // TODO: handle extension EXT_texture_filter_anisotropic (from osgjs)
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(this.target, gl.TEXTURE_WRAP_T, this.wrapT);
    }

    public applyTexImage2D(device: Device) {
        const gl = device.gl;
        const mipObject = this._levels[0] || null;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
        if (this.compressed) {
            gl.compressedTexImage2D(
                this.target,
                0,
                this.internalFormat,
                this.width,
                this.height,
                0,
                mipObject as TypedArray
            );
        } else {
            gl.texImage2D(
                this.target,
                0,
                this.internalFormat,
                this.width,
                this.height,
                0,
                this.format,
                this.internalFormatType,
                mipObject as any
            );
        }

        if (!this.compressed && this.mipmaps) {
            gl.generateMipmap(this.target);
        }
    }

    public destroy(device: Device) {
        const gl = device.gl;

        if (this._glTextureId) {
            gl.deleteTexture(this._glTextureId);
            this._glTextureId = null;
        }
    }
}

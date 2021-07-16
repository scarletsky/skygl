import { ALPHA, LUMINANCE, LUMINANCE_ALPHA, RGB, RGBA, UNSIGNED_BYTE, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_SHORT_5_6_5 } from 'graphics/constants';
import { isNil } from 'utils';
import { Texture, TextureFormat, TextureInternalFormat, TextureType } from './Texture';;

export function parseTextureFormat(format: TextureFormat) {
     switch (format) {
        case TextureFormat.RGB: return RGB;
        case TextureFormat.RGBA: return RGBA;
        case TextureFormat.LUMINANCE: return LUMINANCE;
        case TextureFormat.LUMINANCE_ALPHA: return LUMINANCE_ALPHA;
        case TextureFormat.ALPHA: return ALPHA;
        default: return -1;
    }
}

export function parseTextureInternalFormat(internalFormat: TextureInternalFormat) {
    switch (internalFormat) {
        case TextureInternalFormat.RGB: return RGB;
        case TextureInternalFormat.RGBA: return RGBA;
        case TextureInternalFormat.LUMINANCE: return LUMINANCE;
        case TextureInternalFormat.LUMINANCE_ALPHA: return LUMINANCE_ALPHA;
        case TextureInternalFormat.ALPHA: return ALPHA;
        default: return -1;
    }
}

export function parseTextureType(type: TextureType) {
    switch (type) {
        case TextureType.UNSIGNED_BYTE: return UNSIGNED_BYTE;
        case TextureType.UNSIGNED_SHORT_5_6_5: return UNSIGNED_SHORT_5_6_5;
        case TextureType.UNSIGNED_SHORT_4_4_4_4: return UNSIGNED_SHORT_4_4_4_4;
        case TextureType.UNSIGNED_SHORT_5_5_5_1: return UNSIGNED_SHORT_5_5_5_1;
        default: return -1;
    }
}

export function isTexImageSource(value: any): value is TexImageSource {
    if (!isNil(HTMLImageElement) && value instanceof HTMLImageElement) return true;
    if (!isNil(HTMLCanvasElement) && value instanceof HTMLCanvasElement) return true;
    if (!isNil(HTMLVideoElement) && value instanceof HTMLVideoElement) return true;
    if (!isNil(ImageBitmap) && value instanceof ImageBitmap) return true;
    if (!isNil(ImageData) && value instanceof ImageData) return true;
    return false;
}

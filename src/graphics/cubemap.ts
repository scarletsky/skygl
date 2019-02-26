import Texture, { MipObject, TextureLevels } from "./texture";
import Device from "graphics/device";
import { TypedArray } from "graphics/buffer";

let idCounter = 0;

export default class Cubemap extends Texture {

    public id = idCounter++;
    public target = Texture.TEXTURE_CUBE_MAP;
    public flipY = false;
    public _levels = [] as TextureLevels;

    public setSource(source: MipObject[] | MipObject) {
        source = source as MipObject[];
        this.verifySource(source[0]); // Only check one.
        this._levels[0] = source;
    }

    public applyTexImage2D(device: Device) {
        const gl = device.gl;
        const mipObject = this._levels[0] as MipObject[];
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);

        for (let i = 0; i < 6; i++) {
            if (this.compressed) {
                gl.compressedTexImage2D(
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                    0,
                    this.internalFormat,
                    this.width,
                    this.height,
                    0,
                    mipObject[i] as TypedArray
                )
            } else {
                gl.texImage2D(
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                    0,
                    this.internalFormat,
                    this.width,
                    this.height,
                    0,
                    this.format,
                    this.internalFormatType,
                    mipObject[i] as any
                );
            }
        }

        if (!this.compressed && this.mipmaps) {
            gl.generateMipmap(this.target);
        }
    }
}

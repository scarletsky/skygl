import { Device } from 'graphics/Device';
import { BOOL, BOOL_VEC2, BOOL_VEC3, BOOL_VEC4, FLOAT, FLOAT_MAT3, FLOAT_MAT4, FLOAT_VEC2, FLOAT_VEC3, FLOAT_VEC4, INT, INT_VEC2, INT_VEC3, INT_VEC4, SAMPLER_2D, SAMPLER_CUBE } from 'graphics/constants';
import { Mat3, Mat4, Vec2, Vec3, Vec4 } from 'math';
import { Nullable } from 'types';
import { isNil } from 'utils';
import { Texture } from 'graphics/textures';

export type UniformInputValue = Nullable<number | boolean | Vec2 | Vec3 | Vec4 | Mat3 | Mat4 | Texture>;

export interface UniformInputOptions {
    name: string;
    value?: any;
}

export class UniformInput {
    public name: string;
    public type: number;
    public location: Nullable<WebGLUniformLocation>;
    public setGLUniform: (gl: WebGLRenderingContext, value: any) => void;
    public value: UniformInputValue; // NOTE: this will try to access device.uniforms if value is null
    private uniform: UniformInputValue; // NOTE: this is actual value(cache) set to gl.uniform*

    constructor(options: UniformInputOptions) {
        this.name = options.name;
        this.setGLUniform = (_gl: WebGLRenderingContext, _value: UniformInputValue) => {};
        this.type = -1;
        this.location = null;
        this.value = null;
        this.uniform = null;
    }

    getValue() {
        return this.value;
    }

    setValue(value: UniformInputValue) {
        this.value = value;
    }

    setLocation(location: WebGLUniformLocation | null) {
        this.location = location;
    }

    setType(type: number) {
        this.type = type;

        switch (this.type) {
            case BOOL:
            case INT:
                this.setGLUniform = this.setGLUniformInt;
                break;

            case BOOL_VEC2:
            case INT_VEC2:
                this.uniform = new Vec2();
                this.setGLUniform = this.setGLUniformIntVec2;
                break;

            case BOOL_VEC3:
            case INT_VEC3:
                this.uniform = new Vec3();
                this.setGLUniform = this.setGLUniformIntVec3;
                break;

            case BOOL_VEC4:
            case INT_VEC4:
                this.setGLUniform = this.setGLUniformIntVec4;
                break;

            case FLOAT:
                this.setGLUniform = this.setGLUniformFloat;
                break;

            case FLOAT_VEC2:
                this.uniform = new Vec2();
                this.setGLUniform = this.setGLUniformFloatVec2;
                break;

            case FLOAT_VEC3:
                this.uniform = new Vec3();
                this.setGLUniform = this.setGLUniformFloatVec3;
                break;

            case FLOAT_VEC4:
                this.uniform = new Vec4();
                this.setGLUniform = this.setGLUniformFloatVec4;
                break;

            case FLOAT_MAT3:
                this.uniform = new Mat3();
                this.setGLUniform = this.setGLUniformFloatMat3;
                break;

            case FLOAT_MAT4:
                this.uniform = new Mat4();
                this.setGLUniform = this.setGLUniformFloatMat4;
                break;

            case SAMPLER_2D:
            case SAMPLER_CUBE:
                this.uniform = null;
                this.setGLUniform = this.setGLUniformSampler;
                break;
        }
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;
        let value = this.value;

        if (isNil(value)) value = device.uniforms.resolve(this.name).getValue();

        this.setGLUniform(gl, value);
    }

    onGLUnbind(_device: Device) {

    }

    private setGLUniformInt(gl: WebGLRenderingContext, value: number) {
        if (this.uniform !== value) {
            this.uniform = value;

            if (this.location) gl.uniform1i(this.location, this.uniform);
        }
    }

    private setGLUniformIntVec2(gl: WebGLRenderingContext, value: Vec2) {
        const uniform = this.uniform as Vec2;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform2i(this.location, uniform.x, uniform.y);
        }
    }

    private setGLUniformIntVec3(gl: WebGLRenderingContext, value: Vec3) {
        const uniform = this.uniform as Vec3;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform3i(this.location, uniform.x, uniform.y, uniform.z);
        }
    }

    private setGLUniformIntVec4(gl: WebGLRenderingContext, value: Vec4) {
        const uniform = this.uniform as Vec4;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform4i(this.location, uniform.x, uniform.y, uniform.z, uniform.w);
        }
    }

    private setGLUniformFloat(gl: WebGLRenderingContext, value: number) {
        if (this.uniform !== value) {
            this.uniform = value;

            if (this.location) gl.uniform1f(this.location, this.uniform);
        }
    }

    private setGLUniformFloatVec2(gl: WebGLRenderingContext, value: Vec2) {
        const uniform = this.uniform as Vec2;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform2f(this.location, uniform.x, uniform.y);
        }
    }

    private setGLUniformFloatVec3(gl: WebGLRenderingContext, value: Vec3) {
        const uniform = this.uniform as Vec3;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform3f(this.location, uniform.x, uniform.y, uniform.z);
        }
    }

    private setGLUniformFloatVec4(gl: WebGLRenderingContext, value: Vec4) {
        const uniform = this.uniform as Vec4;

        if (!uniform.equals(value)) {
            uniform.copy(value);

            if (this.location) gl.uniform4f(this.location, uniform.x, uniform.y, uniform.z, uniform.w);
        }
    }

    private setGLUniformFloatMat3(gl: WebGLRenderingContext, value: Mat3) {
        this.uniform = value;

        if (this.location) gl.uniformMatrix3fv(this.location, false, this.uniform.data);
    }

    private setGLUniformFloatMat4(gl: WebGLRenderingContext, value: Mat4) {
        this.uniform = value;

        if (this.location) gl.uniformMatrix4fv(this.location, false, this.uniform.data);
    }

    private setGLUniformSampler(gl: WebGLRenderingContext, value: number) {
        if (this.uniform !== value) {
            this.uniform = value;

            if (this.location) gl.uniform1i(this.location, this.uniform);
        }
    }
}

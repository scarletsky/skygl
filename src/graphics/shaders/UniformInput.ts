import { BOOL, BOOL_VEC2, BOOL_VEC3, BOOL_VEC4, FLOAT, FLOAT_MAT3, FLOAT_MAT4, FLOAT_VEC2, FLOAT_VEC3, FLOAT_VEC4, INT, INT_VEC2, INT_VEC3, INT_VEC4, SAMPLER_2D, SAMPLER_CUBE } from 'graphics/constants';
import { Mat3, Mat4, Vec2, Vec3, Vec4 } from 'math';
import { ShaderInput, ShaderInputOptions } from './ShaderInput';

export interface UniformInputOptions extends ShaderInputOptions {

}

export class UniformInput extends ShaderInput {
    public value: any;
    public location: WebGLUniformLocation;
    public setValue: (gl: WebGLRenderingContext, value: any) => void;

    constructor(options: UniformInputOptions) {
        super(options);

        this.value = null;
        this.location = options.location;
        this.setValue = (_gl: WebGLRenderingContext, _value: any) => {};

        switch (this.type) {
            case BOOL:
            case INT:
                this.setValue = this.setInt;
                break;

            case BOOL_VEC2:
            case INT_VEC2:
                this.value = new Vec2();
                this.setValue = this.setIntVec2;
                break;

            case BOOL_VEC3:
            case INT_VEC3:
                this.value = new Vec3();
                this.setValue = this.setIntVec3;
                break;

            case BOOL_VEC4:
            case INT_VEC4:
                this.setValue = this.setIntVec4;
                break;

            case FLOAT:
                this.setValue = this.setFloat;
                break;

            case FLOAT_VEC2:
                this.value = new Vec2();
                this.setValue = this.setFloatVec2;
                break;

            case FLOAT_VEC3:
                this.value = new Vec3();
                this.setValue = this.setFloatVec3;
                break;

            case FLOAT_VEC4:
                this.value = new Vec4();
                this.setValue = this.setFloatVec4;
                break;

            case FLOAT_MAT3:
                this.value = new Mat3();
                this.setValue = this.setFloatMat3;
                break;

            case FLOAT_MAT4:
                this.value = new Mat4();
                this.setValue = this.setFloatMat4;
                break;

            case SAMPLER_2D:
            case SAMPLER_CUBE:
                this.value = null;
                this.setValue = this.setSampler2D;
                break;
        }
    }


    private setInt(gl: WebGLRenderingContext, value: number) {
        if (this.value !== value) {
            this.value = value;
            gl.uniform1i(this.location, this.value);
        }
    }

    private setIntVec2(gl: WebGLRenderingContext, value: Vec2) {
         if (this.value.x !== value.x ||
             this.value.y !== value.y
           ) {
            this.value.copy(value);
            gl.uniform2i(this.location, this.value.x, this.value.y);
        }
    }

    private setIntVec3(gl: WebGLRenderingContext, value: Vec3) {
         if (this.value.x !== value.x ||
             this.value.y !== value.y ||
             this.value.z !== value.z
           ) {
            this.value.copy(value);
            gl.uniform3i(this.location, this.value.x, this.value.y, this.value.z);
        }
    }

    private setIntVec4(gl: WebGLRenderingContext, value: Vec4) {
         if (this.value.x !== value.x ||
             this.value.y !== value.y ||
             this.value.z !== value.z ||
             this.value.w !== value.w
           ) {
            this.value.copy(value);
            gl.uniform4i(this.location, this.value.x, this.value.y, this.value.z, this.value.w);
        }
    }

    private setFloat(gl: WebGLRenderingContext, value: number) {
        if (this.value !== value) {
            this.value = value;
            gl.uniform1f(this.location, this.value);
        }
    }

    private setFloatVec2(gl: WebGLRenderingContext, value: Vec2) {
        if (this.value.x !== value.x ||
            this.value.y !== value.y
           ) {
            this.value.copy(value);
            gl.uniform2f(this.location, this.value.x, this.value.y);
        }
    }

    private setFloatVec3(gl: WebGLRenderingContext, value: Vec3) {
        if (this.value.x !== value.x ||
            this.value.y !== value.y ||
            this.value.z !== value.z
           ) {
            this.value.copy(value);
            gl.uniform3f(this.location, this.value.x, this.value.y, this.value.z);
        }
    }

    private setFloatVec4(gl: WebGLRenderingContext, value: Vec4) {
        if (this.value.x !== value.x ||
            this.value.y !== value.y ||
            this.value.z !== value.z ||
            this.value.w !== value.w
           ) {
            this.value.copy(value);
            gl.uniform4f(this.location, this.value.x, this.value.y, this.value.z, this.value.w);
        }
    }

    private setFloatMat3(gl: WebGLRenderingContext, value: Mat3) {
        this.value = value;
        gl.uniformMatrix3fv(this.location, false, this.value.data);
    }

    private setFloatMat4(gl: WebGLRenderingContext, value: Mat4) {
        this.value = value;
        gl.uniformMatrix4fv(this.location, false, this.value.data);
    }

    private setSampler2D(gl: WebGLRenderingContext, value: number) {
        if (this.value !== value) {
            this.value = value;
            gl.uniform1i(this.location, this.value);
        }
    }
}

import Vec2 from "../math/vec2";
import Vec3 from "../math/vec3";
import Vec4 from "../math/vec4";
import Mat3 from "../math/mat3";
import Mat4 from "../math/mat4";

type UniformSetter = (gl: WebGLRenderingContext, value: any) => void;

export default class ShaderUniform {
    public static readonly FLOAT_VEC2 = 0x8B50;
    public static readonly FLOAT_VEC3 = 0x8B51;
    public static readonly FLOAT_VEC4 = 0x8B52;
    public static readonly INT_VEC2 = 0x8B53;
    public static readonly INT_VEC3 = 0x8B54;
    public static readonly INT_VEC4 = 0x8B55;
    public static readonly BOOL = 0x8B56;
    public static readonly BOOL_VEC2 = 0x8B57;
    public static readonly BOOL_VEC3 = 0x8B58;
    public static readonly BOOL_VEC4 = 0x8B59;
    public static readonly FLOAT_MAT2 = 0x8B5A;
    public static readonly FLOAT_MAT3 = 0x8B5B;
    public static readonly FLOAT_MAT4 = 0x8B5C;
    public static readonly SAMPLER_2D = 0x8B5E;
    public static readonly SAMPLER_CUBE = 0x8B60;
    public static readonly BYTE = 0xffff;
    public static readonly UNSIGNED_BYTE = 0x1401;
    public static readonly SHORT = 0x1402;
    public static readonly UNSIGNED_SHORT = 0x1403;
    public static readonly INT = 0x1404;
    public static readonly UNSIGNED_INT = 0x1405;
    public static readonly FLOAT = 0x140;

    public name: string;
    public type: number;
    public size: number;
    public value: any;
    public location: WebGLUniformLocation;
    public setValue: UniformSetter;

    constructor(info: WebGLActiveInfo, location: WebGLUniformLocation) {
        this.name = info.name;
        this.type = info.type;
        this.size = info.size;
        this.value = null;
        this.location = location;

        switch (this.type) {
            case ShaderUniform.BOOL:
            case ShaderUniform.INT:
                this.setValue = this.setInt;
                break;

            case ShaderUniform.BOOL_VEC2:
            case ShaderUniform.INT_VEC2:
                this.value = new Vec2();
                this.setValue = this.setIntVec2;
                break;

            case ShaderUniform.BOOL_VEC3:
            case ShaderUniform.INT_VEC3:
                this.value = new Vec3();
                this.setValue = this.setIntVec3;
                break;

            case ShaderUniform.BOOL_VEC4:
            case ShaderUniform.INT_VEC4:
                this.setValue = this.setIntVec4;
                break;

            case ShaderUniform.FLOAT:
                this.setValue = this.setFloat;
                break;

            case ShaderUniform.FLOAT_VEC2:
                this.value = new Vec2();
                this.setValue = this.setFloatVec2;
                break;

            case ShaderUniform.FLOAT_VEC3:
                this.value = new Vec3();
                this.setValue = this.setFloatVec3;
                break;

            case ShaderUniform.FLOAT_VEC4:
                this.value = new Vec4();
                this.setValue = this.setFloatVec4;
                break;

            case ShaderUniform.FLOAT_MAT3:
                this.value = new Mat3();
                this.setValue = this.setFloatMat3;
                break;

            case ShaderUniform.FLOAT_MAT4:
                this.value = new Mat4();
                this.setValue = this.setFloatMat4;
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
         if (this.value.data[0] !== value.data[0] ||
             this.value.data[1] !== value.data[1]
           ) {
            this.value.copy(value);
            gl.uniform2i(this.location, this.value.data[0], this.value.data[1]);
        }
    }

    private setIntVec3(gl: WebGLRenderingContext, value: Vec3) {
         if (this.value.data[0] !== value.data[0] ||
             this.value.data[1] !== value.data[1] ||
             this.value.data[2] !== value.data[2]
           ) {
            this.value.copy(value);
            gl.uniform3i(this.location, this.value.data[0], this.value.data[1], this.value.data[2]);
        }
    }

    private setIntVec4(gl: WebGLRenderingContext, value: Vec4) {
         if (this.value.data[0] !== value.data[0] ||
             this.value.data[1] !== value.data[1] ||
             this.value.data[2] !== value.data[2] ||
             this.value.data[3] !== value.data[3]
           ) {
            this.value.copy(value);
            gl.uniform4i(this.location, this.value.data[0], this.value.data[1], this.value.data[2], this.value.data[3]);
        }
    }

    private setFloat(gl: WebGLRenderingContext, value: number) {
        if (this.value !== value) {
            this.value = value;
            gl.uniform1f(this.location, this.value);
        }
    }

    private setFloatVec2(gl: WebGLRenderingContext, value: Vec2) {
        if (this.value.data[0] !== value.data[0] ||
            this.value.data[1] !== value.data[1]
           ) {
            this.value.copy(value);
            gl.uniform2f(this.location, this.value.x, this.value.y);
        }
    }

    private setFloatVec3(gl: WebGLRenderingContext, value: Vec3) {
        if (this.value.data[0] !== value.data[0] ||
            this.value.data[1] !== value.data[1] ||
            this.value.data[2] !== value.data[2]
           ) {
            this.value.copy(value);
            gl.uniform3f(this.location, this.value.data[0], this.value.data[1], this.value.data[2]);
        }
    }

    private setFloatVec4(gl: WebGLRenderingContext, value: Vec4) {
        if (this.value.data[0] !== value.data[0] ||
            this.value.data[1] !== value.data[1] ||
            this.value.data[2] !== value.data[2] ||
            this.value.data[3] !== value.data[3]
           ) {
            this.value.copy(value);
            gl.uniform4f(this.location, this.value.data[0], this.value.data[1], this.value.data[2], this.value.data[3]);
        }
    }

    private setFloatMat3(gl: WebGLRenderingContext, value: Mat3) {
        this.value = value;
        gl.uniformMatrix3fv(this.location, false, this.value);
    }

    private setFloatMat4(gl: WebGLRenderingContext, value: Mat4) {
        this.value = value;
        gl.uniformMatrix4fv(this.location, false, this.value);
    }
}

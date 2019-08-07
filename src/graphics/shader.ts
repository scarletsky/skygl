import Device from "./device";
import ShaderAttribute from "./shader-attribute";
import ShaderUniform from "./shader-uniform";
import * as ShaderChunks from "./program-lib/shader-chunks";

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    return program;
}

function addLineNumbers(src: string) {
    var chunks = src.split("\n");

    // Chrome reports shader errors on lines indexed from 1
    for (var i = 0, len = chunks.length; i < len; i++) {
        chunks[i] = (i + 1) + ":\t" + chunks[i];
    }

    return chunks.join( "\n" );
}


function parseIncludes(source: string) {
    let pattern = /^[ \t]*#include <([\w\d.]+)>/gm;

    function replacement(_: string, ...args: any[]): string {
        let include = args[0];
        let chunk = ShaderChunks[include as keyof typeof ShaderChunks];
        if (chunk === undefined) {
            throw new Error(`Can not resolve #include <${chunk}>`);
        }

        return parseIncludes(chunk);
    }

    return source.replace(pattern, replacement);
}

function parseVersion(device: Device, version?: string) {
    if (version === undefined) {
        version = device.webgl2 ? "300 es" : "100";
    }

    return `#version ${version}\n${version.substr(0, 3) !== "100" ? "#define GL2 true\n" : ""}`;
}

function parseDefines(defines: ShaderDefines) {
    let chunks = [];

    for (let key in defines) {
        let value = defines[key];
        if (value === false) continue;
        chunks.push(`#define ${key} ${value}\n`);
    }

    return chunks.join("");
}

function parsePrecision(device: Device, precision?: string) {
    if (precision === undefined) {
        precision = "highp";
    }

    return `precision ${precision} float;\n` + `precision ${precision} int;\n`;
}

function replaceLightNums(str: string, defines: ShaderDefines) {
    return str
        .replace(/NUM_DIRECTIONAL_LIGHTS/g, defines.NUM_DIRECTIONAL_LIGHTS || 0)
        .replace(/NUM_POINT_LIGHTS/g, defines.NUM_POINT_LIGHTS || 0)
        .replace(/NUM_SPOT_LIGHTS/g, defines.NUM_SPOT_LIGHTS || 0);
}

function unrollLoops(str: string) {

    var pattern = /#pragma unroll_loop[\s]+?for \(int i \= (\d+)\; i < (\d+)\; i\+\+\) \{([\s\S]+?)(?=\})\}/g;

    function replace(_match: string, start: string, end: string, snippet: string) {

        var unroll = '';

        for (var i = parseInt(start); i < parseInt(end); i++) {

            unroll += snippet.replace(/\[i\]/g, '[' + i + ']');

        }

        return unroll;

    }

    return str.replace(pattern, replace);
}


function filterEmptyLine(str: string) {
    return str !== "";
}

interface ShaderDefines {
    [define: string]: any
}

interface ShaderDefinition {
    defines?: ShaderDefines;
    precision?: string;
    version?: string;
    vshader: string;
    fshader: string;
}

let idCounter = 0;

export default class Shader {
    public static TYPE_VERTEX = 0;
    public static TYPE_FRAGMENT = 1;

    public id = idCounter++;
    public ready = false;
    public version: string;
    public attributes = [] as ShaderAttribute[];
    public uniforms = [] as ShaderUniform[];
    public samplers = [] as ShaderUniform[];
    public program: WebGLProgram;

    private definition: ShaderDefinition;
    private vshader: WebGLShader;
    private fshader: WebGLShader;

    constructor(definition: ShaderDefinition) {
        if (!definition.defines) {
            definition.defines = {};
        }

        this.definition = definition;
    }

    public apply(device: Device) {
        const gl = device.gl;

        let version = parseVersion(device, this.definition.version);
        let defines = parseDefines(this.definition.defines);
        let precision = parsePrecision(device);
        let vshader = parseIncludes(this.definition.vshader);
        let fshader = parseIncludes(this.definition.fshader);
        vshader = unrollLoops(replaceLightNums(vshader, this.definition.defines));
        fshader = unrollLoops(replaceLightNums(fshader, this.definition.defines));

        vshader = version + defines + precision + vshader;
        fshader = version + defines + precision + fshader;

        // console.log("vertex shader: \n", addLineNumbers(vshader));
        // console.log("fragment shader: \n", addLineNumbers(fshader));

        this.vshader = createShader(gl, gl.VERTEX_SHADER, vshader);
        this.fshader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
        this.program = createProgram(gl, this.vshader, this.fshader);
        gl.linkProgram(this.program);

        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            console.error("Failed to compile vertex shader:\n\n", addLineNumbers(vshader), "\n\n", gl.getShaderInfoLog(this.vshader));
            return false;
        }

        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            console.error("Failed to compile fragment shader:\n\n", addLineNumbers(fshader), "\n\n", gl.getShaderInfoLog(this.fshader));
            return false;
        }

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error("Failed to link shader program:\n\n", gl.getProgramInfoLog(this.program));
            return false;
        }

        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);

        let info: WebGLActiveInfo;
        let location: number | WebGLUniformLocation;
        let i = 0;
        const numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            info = gl.getActiveAttrib(this.program, i++);
            location = gl.getAttribLocation(this.program, info.name);
            this.attributes.push(new ShaderAttribute(info, location as number));
        }

        i = 0;
        const numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            info = gl.getActiveUniform(this.program, i++);
            location = gl.getUniformLocation(this.program, info.name);
            // TODO support webgl2: gl.SAMPLER_2D_SHADOE, gl.SAMPLER_CUBE_SHADOW, gl.SAMPLER_3D
            if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE) {
                this.samplers.push(new ShaderUniform(info, location as WebGLUniformLocation));
            } else {
                this.uniforms.push(new ShaderUniform(info, location as WebGLUniformLocation));
            }
        }

        this.ready = true;

        return true;
    }

    public destroy(device: Device) {
        if (this.program) {
            const gl = device.gl;
            gl.deleteProgram(this.program);
            this.program = null;
        }

        this.ready = false;
    }
}

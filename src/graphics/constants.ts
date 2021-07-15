// NOTE: from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants

// NOTE: Primitive
export const POINTS = 0x0000;
export const LINES = 0x0001;
export const LINE_LOOP = 0x0002;
export const LINE_STRIP = 0x0003;
export const TRIANGLES = 0x0004;
export const TRIANGLE_STRIP = 0x0005;
export const TRIANGLE_FAN = 0x0006;

// NOTE: Data types
export const BYTE = 5120;
export const UNSIGNED_BYTE = 5121;
export const SHORT = 5122;
export const UNSIGNED_SHORT = 5123;
export const INT = 5124;
export const UNSIGNED_INT = 5125;
export const FLOAT = 5126;

// NOTE: Uniform types
export const FLOAT_VEC2 = 0x8B50;
export const FLOAT_VEC3 = 0x8B51;
export const FLOAT_VEC4 = 0x8B52;
export const INT_VEC2 = 0x8B53;
export const INT_VEC3 = 0x8B54;
export const INT_VEC4 = 0x8B55;
export const BOOL = 0x8B56;
export const BOOL_VEC2 = 0x8B57;
export const BOOL_VEC3 = 0x8B58;
export const BOOL_VEC4 = 0x8B59;
export const FLOAT_MAT2 = 0x8B5A;
export const FLOAT_MAT3 = 0x8B5B;
export const FLOAT_MAT4 = 0x8B5C;
export const SAMPLER_2D = 0x8B5E;
export const SAMPLER_CUBE = 0x8B60;

// NOTE: Buffer
export const ELEMENT_ARRAY_BUFFER = 0x8893;
export const ARRAY_BUFFER = 0x8892;
export const STATIC_DRAW = 0x88e4;
export const DYNAMIC_DRAW = 0x88e8;
export const STREAM_DRAW = 0x88e0;

// NOTE: clear
export const COLOR_BUFFER_BIT = 0x00004000;
export const DEPTH_BUFFER_BIT = 0x00000100;
export const STENCIL_BUFFER_BIT = 0x00000400;

// NOTE: depth
export const NEVER = 0x0200;
export const LESS = 0x0201;
export const EQUAL = 0x0202;
export const LEQUAL = 0x0203;
export const GREATER = 0x0204;
export const NOTEQUAL = 0x0205;
export const GEQUAL = 0x0206;
export const ALWAYS = 0x0207;

// NOTE: stencil
export const KEEP = 0x1E00;
export const REPLACE = 0x1E01;
export const INCR = 0x1E02;
export const DECR = 0x1E03;
export const INVERT = 0x150A;
export const INCR_WRAP = 0x8507;
export const DECR_WRAP = 0x8508;

// NOTE: textures
export const NEAREST = 0x2600;
export const LINEAR = 0x2601;
export const NEAREST_MIPMAP_NEAREST = 0x2700;
export const LINEAR_MIPMAP_NEAREST = 0x2701;
export const NEAREST_MIPMAP_LINEAR = 0x2702;
export const LINEAR_MIPMAP_LINEAR = 0x2703;
export const TEXTURE_MAG_FILTER = 0x2800;
export const TEXTURE_MIN_FILTER = 0x2801;
export const TEXTURE_WRAP_S = 0x2802;
export const TEXTURE_WRAP_T = 0x2803;
export const TEXTURE_2D = 0x0DE1;
export const TEXTURE = 0x1702;
export const TEXTURE_CUBE_MAP = 0x8513;
export const TEXTURE_BINDING_CUBE_MAP = 0x8514;
export const TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
export const TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
export const TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
export const TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
export const TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
export const TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
export const MAX_TEXTURE_SIZE = 0x0D33;
export const MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
export const TEXTURE0 = 0x84C0;
export const ACTIVE_TEXTURE = 0x84E0;
export const REPEAT = 0x2901;
export const CLAMP_TO_EDGE = 0x812F;
export const MIRRORED_REPEAT = 0x8370;

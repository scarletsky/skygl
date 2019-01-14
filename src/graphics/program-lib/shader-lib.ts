import basicVS from "./shader-lib/basic.vert";
import basicFS from "./shader-lib/basic.frag";
import depthVS from "./shader-lib/depth.vert";
import depthFS from "./shader-lib/depth.frag";
import phongVS from "./shader-lib/phong.vert";
import phongFS from "./shader-lib/phong.frag";

export const basic = {
    vshader: basicVS,
    fshader: basicFS
};

export const phong = {
    vshader: phongVS,
    fshader: phongFS
};

export const depth = {
    vshader: depthVS,
    fshader: depthFS
};

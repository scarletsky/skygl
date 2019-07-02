import basicVS from "./shader-lib/basic.vert";
import basicFS from "./shader-lib/basic.frag";
import depthVS from "./shader-lib/depth.vert";
import depthFS from "./shader-lib/depth.frag";
import phongVS from "./shader-lib/phong.vert";
import phongFS from "./shader-lib/phong.frag";
import pbrVS from "./shader-lib/pbr.vert";
import pbrFS from "./shader-lib/pbr.frag";
import skyboxVS from "./shader-lib/skybox.vert";
import skyboxFS from "./shader-lib/skybox.frag";
import quadVS from "./shader-lib/quad.vert";
import quadFS from "./shader-lib/quad.frag";
import prefilterCubemapFS from "./shader-lib/prefilter-cubemap.frag";
import cubemapToIrradianceMapVS from "./shader-lib/cubemap-to-irradiancemap.vert";
import cubemapToIrradianceMapFS from "./shader-lib/cubemap-to-irradiancemap.frag";
import equirectangularToCubemapFS from "./shader-lib/equirectangular-to-cubemap.frag";
import integrateBRDFFS from "./shader-lib/integrate-brdf.frag";

export const basic = {
    vshader: basicVS,
    fshader: basicFS
};

export const phong = {
    vshader: phongVS,
    fshader: phongFS
};

export const pbr = {
    vshader: pbrVS,
    fshader: pbrFS
};

export const depth = {
    vshader: depthVS,
    fshader: depthFS
};

export const skybox = {
    vshader: skyboxVS,
    fshader: skyboxFS
};

export const quad = {
    vshader: quadVS,
    fshader: quadFS
};

export const prefilterCubemap = {
    vshader: cubemapToIrradianceMapVS,
    fshader: prefilterCubemapFS
};

export const cubemapToIrradianceMap = {
    vshader: cubemapToIrradianceMapVS,
    fshader: cubemapToIrradianceMapFS
};

export const equirectangularToCubemap = {
    vshader: cubemapToIrradianceMapVS,
    fshader: equirectangularToCubemapFS
};

export const integrateBRDF = {
    vshader: quadVS,
    fshader: integrateBRDFFS
};

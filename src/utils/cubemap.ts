import { Cubemap, Device, RenderTarget, Texture, Shader } from "graphics";
import { BoxGeometry, QuadGeometry } from "geometries";
import { Mat4, Vec3, DEG_TO_RAD } from "math";
import { Mesh } from "scene";
import { Material } from "materials";
import {
    prefilterCubemap as prefilterCubemapShader,
    cubemapToIrradianceMap as cubemapToIrradianceMapShader,
    equirectangularToCubemap as equirectangularToCubemapShader,
    integrateBRDF as integrateBRDFShader,
} from "../graphics/program-lib/shader-lib";

export function prefilterCubemap(device: Device, cubemap: Cubemap, maxMipSize = 128, maxMipLevels = 5) {
    const scope = device.scope;
    const gl = device.gl;
    const mesh = new Mesh(
        new BoxGeometry(),
        new Material({
            cullFace: Material.CULLFACE_NONE,
            depthFunc: Material.DEPTHFUNC_LEQUAL
        })
    );
    const shader = new Shader({
        vshader: prefilterCubemapShader.vshader,
        fshader: prefilterCubemapShader.fshader
    });
    const viewMatrix = new Mat4();
    const projectionMatrix = new Mat4().setPerspective(90 * DEG_TO_RAD, 1, 0.1, 10);
    const targets = [];
    const prefilteredCubemaps = [];

    scope.setValue("uProjectionMatrix", projectionMatrix);
    scope.setValue("uEnvironmentMap", cubemap);
    mesh.material.apply(device);
    device.setShader(shader);
    device.setColorWrite(true, true, true, true);


    for (let mip = 0; mip < maxMipLevels; mip++) {
        let size = maxMipSize * Math.pow(0.5, mip);
        let roughness = mip / (maxMipLevels - 1);
        let prefilteredCubemap = new Cubemap({
            name: `Prefiltered Cubemap ${size}`,
            width: size,
            height: size,
            flipY: false
        });
        let cubemapPixels = [];
        prefilteredCubemaps.push(prefilteredCubemap);
        scope.setValue("uRoughness", roughness);
        device.setViewport(0, 0, size, size);

        for (let face = 0; face < 6; face++) {
            let rt = new RenderTarget({
                colorBuffer: new Texture({
                    width: size,
                    height: size,
                    magFilter: Texture.LINEAR,
                    minFilter: Texture.LINEAR_MIPMAP_LINEAR,
                    wrapS: Texture.CLAMP_TO_EDGE,
                    wrapT: Texture.CLAMP_TO_EDGE,
                }),
            });
            let facePixels = new Uint8Array(size * size * 4);
            targets.push(rt);
            cubemapPixels.push(facePixels);

            switch (face) {
                case 0: viewMatrix.setLookAt(Vec3.ZERO, Vec3.RIGHT, Vec3.DOWN); break;
                case 1: viewMatrix.setLookAt(Vec3.ZERO, Vec3.LEFT, Vec3.DOWN); break;
                case 2: viewMatrix.setLookAt(Vec3.ZERO, Vec3.DOWN, Vec3.FORWARD); break;
                case 3: viewMatrix.setLookAt(Vec3.ZERO, Vec3.UP, Vec3.BACK); break;
                case 4: viewMatrix.setLookAt(Vec3.ZERO, Vec3.BACK, Vec3.DOWN); break;
                case 5: viewMatrix.setLookAt(Vec3.ZERO, Vec3.FORWARD, Vec3.DOWN); break;
            }

            scope.setValue("uViewMatrix", viewMatrix);
            device.setRenderTarget(rt);
            device.clear();
            device.draw(mesh);
            gl.readPixels(0, 0, size, size, rt.colorBuffer.internalFormat, rt.colorBuffer.internalFormatType, facePixels);
        }
        prefilteredCubemap.setSource(cubemapPixels);
    }

    device.setRenderTarget(null);
    shader.destroy(device);
    targets.forEach(target => target.destroy(device));

    return prefilteredCubemaps;
}

export function generateIntegrateBRDFMap(device: Device, size = 512) {
    const mesh = new Mesh(
        new QuadGeometry(),
        new Material()
    );
    const shader = new Shader({
        vshader: integrateBRDFShader.vshader,
        fshader: integrateBRDFShader.fshader
    });
    const rt = new RenderTarget({
        colorBuffer: new Texture({
            name: "Integrade BRDF Map",
            width: size,
            height: size,
            magFilter: Texture.LINEAR,
            minFilter: Texture.LINEAR_MIPMAP_LINEAR,
            wrapS: Texture.CLAMP_TO_EDGE,
            wrapT: Texture.CLAMP_TO_EDGE,
        })
    });

    mesh.material.apply(device);

    device.setShader(shader);
    device.setColorWrite(true, true, true, true);
    device.setViewport(0, 0, size, size);
    device.clear();
    device.setRenderTarget(rt);
    device.draw(mesh);

    device.setRenderTarget(null);
    shader.destroy(device);

    return rt;
}

export function cubemapToIrradianceMap(device: Device, cubemap: Cubemap, size = 128) {
    const scope = device.scope;
    const gl = device.gl;
    const mesh = new Mesh(
        new BoxGeometry(),
        new Material({
            cullFace: Material.CULLFACE_NONE,
            depthFunc: Material.DEPTHFUNC_LEQUAL
        })
    );
    const viewMatrix = new Mat4();
    const projectionMatrix = new Mat4().setPerspective(90 * DEG_TO_RAD, 1, 0.1, 10);
    const shader = new Shader({
        vshader: cubemapToIrradianceMapShader.vshader,
        fshader: cubemapToIrradianceMapShader.fshader
    });
    const irradianceMap = new Cubemap({
        name: "Cubemap to Irradiance Map",
        width: size,
        height: size,
        flipY: true
    });
    const targets = [];
    const cubemapPixels = [];

    scope.setValue("uProjectionMatrix", projectionMatrix);
    scope.setValue("uEnvironmentMap", cubemap);
    mesh.material.apply(device);
    device.setShader(shader);
    device.setColorWrite(true, true, true, true);
    device.setViewport(0, 0, size, size);

    for (let face = 0; face < 6; face++) {
        let rt = new RenderTarget({
            colorBuffer: new Texture({
                width: size,
                height: size,
                magFilter: Texture.LINEAR,
                minFilter: Texture.LINEAR,
                wrapS: Texture.CLAMP_TO_EDGE,
                wrapT: Texture.CLAMP_TO_EDGE,
            }),
        });
        let facePixels = new Uint8Array(size * size * 4);
        targets.push(rt);
        cubemapPixels.push(facePixels);

        switch (face) {
            case 0: viewMatrix.setLookAt(Vec3.ZERO, Vec3.RIGHT, Vec3.DOWN); break;
            case 1: viewMatrix.setLookAt(Vec3.ZERO, Vec3.LEFT, Vec3.DOWN); break;
            case 2: viewMatrix.setLookAt(Vec3.ZERO, Vec3.UP, Vec3.BACK); break;
            case 3: viewMatrix.setLookAt(Vec3.ZERO, Vec3.DOWN, Vec3.FORWARD); break;
            case 4: viewMatrix.setLookAt(Vec3.ZERO, Vec3.BACK, Vec3.DOWN); break;
            case 5: viewMatrix.setLookAt(Vec3.ZERO, Vec3.FORWARD, Vec3.DOWN); break;
        }

        scope.setValue("uViewMatrix", viewMatrix);
        device.setRenderTarget(rt);
        device.clear();
        device.draw(mesh);
        gl.readPixels(0, 0, size, size, rt.colorBuffer.internalFormat, rt.colorBuffer.internalFormatType, facePixels);
    }

    irradianceMap.setSource(cubemapPixels);
    device.setRenderTarget(null);
    shader.destroy(device);
    targets.forEach(target => target.destroy(device));

    return irradianceMap;
}

export function equirectangularToCubemap(device: Device, equirectangularMap: Texture, size = 512) {
    const scope = device.scope;
    const gl = device.gl;
    const mesh = new Mesh(
        new BoxGeometry(),
        new Material({
            cullFace: Material.CULLFACE_NONE,
            depthFunc: Material.DEPTHFUNC_LEQUAL
        })
    );
    const viewMatrix = new Mat4();
    const projectionMatrix = new Mat4().setPerspective(90 * DEG_TO_RAD, 1, 0.1, 10);
    const shader = new Shader({
        vshader: equirectangularToCubemapShader.vshader,
        fshader: equirectangularToCubemapShader.fshader,
    });
    const cubemap = new Cubemap({
        name: "Equirectangular To Cubemap",
        width: size,
        height: size,
        flipY: true
    });
    const targets = [];
    const pixels = [];

    scope.setValue("uProjectionMatrix", projectionMatrix);
    scope.setValue("uEquirectangularMap", equirectangularMap);
    mesh.material.apply(device);
    device.setShader(shader);
    device.setColorWrite(true, true, true, true);
    device.setViewport(0, 0, size, size);

    for (let face = 0; face < 6; face++) {
        let rt = new RenderTarget({
            colorBuffer: new Texture({
                width: size,
                height: size,
                magFilter: Texture.LINEAR,
                minFilter: Texture.LINEAR,
                wrapS: Texture.CLAMP_TO_EDGE,
                wrapT: Texture.CLAMP_TO_EDGE,
            }),
        });
        let pixel = new Uint8Array(size * size * 4);
        targets.push(rt);
        pixels.push(pixel);

        switch (face) {
            case 0: viewMatrix.setLookAt(Vec3.ZERO, Vec3.RIGHT, Vec3.DOWN); break;
            case 1: viewMatrix.setLookAt(Vec3.ZERO, Vec3.LEFT, Vec3.DOWN); break;
            case 2: viewMatrix.setLookAt(Vec3.ZERO, Vec3.UP, Vec3.BACK); break;
            case 3: viewMatrix.setLookAt(Vec3.ZERO, Vec3.DOWN, Vec3.FORWARD); break;
            case 4: viewMatrix.setLookAt(Vec3.ZERO, Vec3.BACK, Vec3.DOWN); break;
            case 5: viewMatrix.setLookAt(Vec3.ZERO, Vec3.FORWARD, Vec3.DOWN); break;
        }

        scope.setValue("uViewMatrix", viewMatrix);
        device.setRenderTarget(rt);
        device.clear();
        device.draw(mesh);
        gl.readPixels(0, 0, size, size, rt.colorBuffer.internalFormat, rt.colorBuffer.internalFormatType, pixel);
    }

    cubemap.setSource(pixels);
    device.setRenderTarget(null);
    shader.destroy(device);
    targets.forEach(target => target.destroy(device));

    return cubemap;
}

import { Camera, CameraOptions } from './Camera';

export interface PerspectiveCameraOptions extends CameraOptions {
    aspectRatio: number;
    fov: number;
    znear: number;
    zfar: number;
}

export class PerspectiveCamera extends Camera {
    public aspectRatio = 1;
    public fov = 45;
    public znear = 0.01;
    public zfar = 1000;

    constructor(options: Partial<PerspectiveCameraOptions> = {}) {
        super();
        this.fromJSON(options);
    }

    fromJSON(options: Partial<PerspectiveCameraOptions>) {
        if (options.aspectRatio) {
            this.aspectRatio = options.aspectRatio;
        }

        if (options.fov) {
            this.fov = options.fov;
        }

        if (options.znear) {
            this.znear = options.znear;
        }

        if (options.zfar) {
            this.zfar = options.zfar;
        }
    }

    toJSON(): PerspectiveCameraOptions {
        return Object.assign(super.toJSON(), {
            aspectRatio: this.aspectRatio,
            fov: this.fov,
            znear: this.znear,
            zfar: this.zfar
        });
    }
}

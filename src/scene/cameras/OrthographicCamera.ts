import { Camera, CameraOptions } from './Camera';

export interface OrthographicCameraOptions extends CameraOptions {

}

export class OrthographicCamera extends Camera {

    constructor(options: Partial<OrthographicCameraOptions> = {}) {
        super();
    }

}

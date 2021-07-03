// NOTE: Do not use export * as xxx from '...', see `chunks/index.ts` for more detail.
import { default as lambertVert } from './lambert.vert';
import { default as lambertFrag } from './lambert.frag';

export const lambert = {
    vertexSource: lambertVert,
    fragmentSource: lambertFrag,
};

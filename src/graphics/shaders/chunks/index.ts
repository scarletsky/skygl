// NOTE:
//   Do not use export * as xxx from '...';
//   Because this will add the `default` wrapper.
//   When we call `import * as chunks from '...'`,
//   we will get { common: { default: 'code' }, packingNormal: { default: 'code' }, ... }
export { default as common } from './common.glsl';
export { default as vertexDeclare } from './vertexDeclare.glsl';
export { default as fragmengDeclare } from './fragmentDeclare.glsl';
export { default as packingNormal } from './packingNormal.glsl';
export { default as packingDepth } from './packingDepth.glsl';

import { Primitive } from './Primitive';
import { VertexBufferGroup } from './buffers';
import { IndexBuffer } from './buffers/IndexBuffer';
import { Shader } from './shaders/Shader';
import { Nullable } from 'types';
import { Material } from 'scene/materials';

export interface Drawable {
    primitive: Primitive;
    vertices: VertexBufferGroup;
    indices: Nullable<IndexBuffer>;
    shader: Nullable<Shader>;
    material?: Nullable<Material>;
}

import { Primitive } from './Primitive';
import { VertexBuffer } from './buffer/VertexBuffer';
import { IndexBuffer } from './buffer/IndexBuffer';
import { Shader } from './shader/Shader';
import { Device } from './Device';
import { Nullable } from 'types';

export interface Drawable {
    shader: Shader;
    primitive: Primitive;
    vertices: VertexBuffer[];
    indices: Nullable<IndexBuffer>;
}

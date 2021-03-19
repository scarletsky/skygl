import { Primitive } from './Primitive';
import { VertexBuffer, VertexBufferGroup } from './buffer/VertexBuffer';
import { IndexBuffer } from './buffer/IndexBuffer';
import { Shader } from './shader/Shader';
import { Device } from './Device';
import { Nullable } from 'types';

export interface Drawable {
    shader: Shader;
    primitive: Primitive;
    vertices: VertexBufferGroup;
    indices: Nullable<IndexBuffer>;
}

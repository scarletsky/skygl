import { Primitive } from './Primitive';
import { VertexBuffer, VertexBufferGroup } from './buffers/VertexBuffer';
import { IndexBuffer } from './buffers/IndexBuffer';
import { Shader } from './shaders/Shader';
import { Device } from './Device';
import { Nullable } from 'types';

export interface Drawable {
    shader: Shader;
    primitive: Primitive;
    vertices: VertexBufferGroup;
    indices: Nullable<IndexBuffer>;
}

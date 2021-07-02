import { Primitive } from './Primitive';
import { VertexBufferGroup } from './buffers';
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

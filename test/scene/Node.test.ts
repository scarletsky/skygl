import { Vec3 } from 'math/Vec3';
import { Node } from 'scene/Node';

test('getLocalPosition and setLocalPosition', () => {
    const node = new Node();
    const input = [1, 2, 3];

    node.setLocalPosition(new Vec3(...input));

    expect([
        node.localTransform.data[12],
        node.localTransform.data[13],
        node.localTransform.data[14]
    ]).toEqual([0, 0, 0]);

    const position = node.getLocalPosition();

    expect([position.x, position.y, position.z]).toEqual(input);
});

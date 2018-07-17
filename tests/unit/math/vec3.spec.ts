import Vec3 from "math/vec3";

test("Vec3#add", function() {
    const v1 = new Vec3(1, 1, 1);
    const v2 = new Vec3(2, 0, 2);
    const v3 = new Vec3(-1, -2, -3);

    v1.add(v2);
    expect(v1.x).toBe(3);
    expect(v1.y).toBe(1);
    expect(v1.z).toBe(3);

    v1.add(v3);
    expect(v1.x).toBe(2);
    expect(v1.y).toBe(-1);
    expect(v1.z).toBe(0);
});

test("Vec3#add2", function() {
    const v1 = new Vec3(1, 1, 1);
    const v2 = new Vec3(2, 0, 2);
    const v3 = new Vec3(-1, -2, -3);
    const v4 = new Vec3();

    v4.add2(v1, v2);
    expect(v4.x).toBe(3);
    expect(v4.y).toBe(1);
    expect(v4.z).toBe(3);

    v4.add2(v1, v3);
    expect(v4.x).toBe(0);
    expect(v4.y).toBe(-1);
    expect(v4.z).toBe(-2);
});

test("Vec3#clone", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);
    const v3 = v1.clone();
    const v4 = v2.clone();

    expect(v3.x).toBe(v1.x);
    expect(v3.y).toBe(v1.y);
    expect(v3.z).toBe(v1.z);

    expect(v4.x).toBe(v2.x);
    expect(v4.y).toBe(v2.y);
    expect(v4.z).toBe(v2.z);
});

test("Vec3#copy", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);
    const v3 = new Vec3();
    const v4 = new Vec3();

    v3.copy(v1);
    expect(v3.x).toBe(v1.x);
    expect(v3.y).toBe(v1.y);
    expect(v3.z).toBe(v1.z);

    v4.copy(v2);
    expect(v4.x).toBe(v2.x);
    expect(v4.y).toBe(v2.y);
    expect(v4.z).toBe(v2.z);
});

test("Vec3#cross", function() {
    const v1 = new Vec3(1, 0, 0);
    const v2 = new Vec3(0, 1, 0);
    const v3 = new Vec3(0, 0, 1);
    const v4 = new Vec3();

    v4.cross(v1, v2);
    expect(v4.x).toBe(0);
    expect(v4.y).toBe(0);
    expect(v4.z).toBe(1);

    v4.cross(v2, v3);
    expect(v4.x).toBe(1);
    expect(v4.y).toBe(0);
    expect(v4.z).toBe(0);
});

test("Vec3#dot", function() {
    const v1 = new Vec3(1, 0, 0);
    const v2 = new Vec3(0, 1, 0);
    const v3 = new Vec3(1, 1, 0);

    expect(v1.dot(v2)).toBe(0);
    expect(v1.dot(v3)).toBe(1);
    expect(v2.dot(v3)).toBe(1);
});

test("Vec3#equals", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(1, 2, 3);
    const v3 = new Vec3(3, 2, 1);

    expect(v1.equals(v2)).toBeTruthy();
    expect(v1.equals(v3)).toBeFalsy();
});

test("Vec3#length", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -1, -1);
    const v3 = new Vec3(3, 4, 5);

    expect(v1.length()).toBe(Math.sqrt(14));
    expect(v2.length()).toBe(Math.sqrt(3));
    expect(v3.length()).toBe(Math.sqrt(50));
});

test("Vec3#lengthSq", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -1, -1);
    const v3 = new Vec3(3, 4, 5);

    expect(v1.lengthSq()).toBe(14);
    expect(v2.lengthSq()).toBe(3);
    expect(v3.lengthSq()).toBe(50);
});

test("Vec3#lerp", function() {
    const v1 = new Vec3(0, 0, 0);
    const v2 = new Vec3(10, 10, 10);
    const v3 = new Vec3();

    v3.lerp(v1, v2, 0);
    expect(v3.x).toBe(0);
    expect(v3.y).toBe(0);
    expect(v3.z).toBe(0);

    v3.lerp(v1, v2, 0.5);
    expect(v3.x).toBe(5);
    expect(v3.y).toBe(5);
    expect(v3.z).toBe(5);

    v3.lerp(v1, v2, 1);
    expect(v3.x).toBe(10);
    expect(v3.y).toBe(10);
    expect(v3.z).toBe(10);
});

test("Vec3#mul", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 2, 1);
    const v3 = new Vec3(-1, -2, -3);

    v1.mul(v2);
    expect(v1.x).toBe(3);
    expect(v1.y).toBe(4);
    expect(v1.z).toBe(3);

    v1.mul(v3);
    expect(v1.x).toBe(-3);
    expect(v1.y).toBe(-8);
    expect(v1.z).toBe(-9);
});

test("Vec3#mul2", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 2, 1);
    const v3 = new Vec3(-1, -2, -3);
    const v4 = new Vec3();

    v4.mul2(v1, v2);
    expect(v4.x).toBe(3);
    expect(v4.y).toBe(4);
    expect(v4.z).toBe(3);

    v4.mul2(v4, v3);
    expect(v4.x).toBe(-3);
    expect(v4.y).toBe(-8);
    expect(v4.z).toBe(-9);
});

test("Vec3#normalize", function() {
    const v1 = new Vec3(10, 0, 0).normalize();
    const v2 = new Vec3(0, -5, 0).normalize();
    const v3 = new Vec3(0, 0, 9).normalize();

    expect(v1.length()).toBe(1);
    expect(v1.x).toBe(1);

    expect(v2.length()).toBe(1);
    expect(v2.y).toBe(-1);

    expect(v3.length()).toBe(1);
    expect(v3.z).toBe(1);
});

test("Vec3#project", function() {
    const v1 = new Vec3(1, 1, 0);
    const v2 = new Vec3(-2, -2, 0);
    const v3 = new Vec3(10, 0, 0);
    v1.project(v3);
    v2.project(v3);

    expect(v1.x).toBe(1);
    expect(v1.y).toBe(0);
    expect(v1.z).toBe(0);

    expect(v2.x).toBe(-2);
    expect(v2.y).toBe(-0);
    expect(v2.z).toBe(-0);
});

test("Vec3#scale", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-2, -3, -4);
    v1.scale(5);
    v2.scale(9);

    expect(v1.x).toBe(5);
    expect(v1.y).toBe(10);
    expect(v1.z).toBe(15);

    expect(v2.x).toBe(-18);
    expect(v2.y).toBe(-27);
    expect(v2.z).toBe(-36);
});

test("Vec3#set", function() {
    const v1 = new Vec3();
    const v2 = new Vec3();
    v1.set(1, 2, 3);
    v2.set(-9, -8, -7);

    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
    expect(v1.z).toBe(3);

    expect(v2.x).toBe(-9);
    expect(v2.y).toBe(-8);
    expect(v2.z).toBe(-7);
});

test("Vec3#sub", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(5, 6, 7);
    const v3 = new Vec3(-2, -3, -4);

    v1.sub(v2);
    expect(v1.x).toBe(-4);
    expect(v1.y).toBe(-4);
    expect(v1.z).toBe(-4);

    v1.sub(v3);
    expect(v1.x).toBe(-2);
    expect(v1.y).toBe(-1);
    expect(v1.z).toBe(0);
});

test("Vec3#sub2", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(5, 6, 7);
    const v3 = new Vec3(-2, -3, -4);
    const v4 = new Vec3();

    v4.sub2(v1, v2);
    expect(v4.x).toBe(-4);
    expect(v4.y).toBe(-4);
    expect(v4.z).toBe(-4);

    v4.sub2(v4, v3);
    expect(v4.x).toBe(-2);
    expect(v4.y).toBe(-1);
    expect(v4.z).toBe(0);
});

test("Vec3#toString", function() {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(-1, -2, -3);

    expect(v1.toString()).toBe("[1, 2, 3]");
    expect(v2.toString()).toBe("[-1, -2, -3]");
});

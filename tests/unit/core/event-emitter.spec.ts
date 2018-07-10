import EventEmitter from "core/event-emitter";

test("EventEmitter#on", function() {
    const ee = new EventEmitter();

    ee.on("event1", function() {});
    ee.on("event2", function() {});
    ee.on("event2", function() {});

    expect(ee._callbacks["event1"].length).toBe(1);
    expect(ee._callbacks["event2"].length).toBe(2);
    expect(ee._callbacks["event3"]).toBeUndefined();
});

test("EventEmitter#once", function() {
    const ee = new EventEmitter();

    ee.once("event1", function() {});
    ee.on("event1", function() {});
    ee.once("event1", function() {});

    expect(ee._callbacks["event1"].length).toBe(3);

    ee.fire("event1");

    expect(ee._callbacks["event1"].length).toBe(1);
});

test("EventEmitter#off", function() {
    const ee = new EventEmitter();
    const cb1 = () => {};
    const cb2 = () => {};

    ee.on("event1", cb1);
    ee.on("event1", cb2);
    ee.on("event1", function() {});
    ee.on("event1", function() {});

    expect(ee._callbacks["event1"].length).toBe(4);

    ee.off("event1", cb1);

    expect(ee._callbacks["event1"].length).toBe(3);

    ee.off("event1", cb1);

    expect(ee._callbacks["event1"].length).toBe(3);

    ee.off("event1", cb2);

    expect(ee._callbacks["event1"].length).toBe(2);
    
    ee.off("event1");

    expect(ee._callbacks["event1"].length).toBe(0);
});

test("EventEmitter#fire", function() {
    const ee = new EventEmitter();
    const cb1 = (data) => {
        expect(data).toBeUndefined();
    };
    const cb2 = (a, b, c) => {
        expect(a).toBe(1);
        expect(b).toBe(2);
        expect(c).toBe(3);
    };

    ee.on("event1", cb1);
    ee.on("event2", cb2);
    ee.fire("event1");
    ee.fire("event2", 1, 2, 3);
});

test("EventEmitter#hasEvent", function() {
    const ee = new EventEmitter();

    ee.on("event1", function() {});

    expect(ee.hasEvent("event1")).toBeTruthy();
    expect(ee.hasEvent("event2")).toBeFalsy();
});

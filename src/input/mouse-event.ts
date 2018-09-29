import InputEvent from "input/input-event";

const mouseDeltaFactor = 120;
const deltaYFactor = navigator.platform.indexOf("Mac") === 0 ? -1 : -3;

export default class CustomMouseEvent extends InputEvent {
    public static lastX = 0;
    public static lastY = 0;

    public x: number;
    public y: number;
    public dx: number;
    public dy: number;
    public wheel: number;
    public button: number;
    public buttons: number;
    public nativeEvent: MouseEvent;

    constructor(nativeEvent: MouseEvent) {
        super(nativeEvent);
        this.x = nativeEvent.offsetX;
        this.y = nativeEvent.offsetY;
        this.dx = this.x - CustomMouseEvent.lastX;
        this.dy = this.y - CustomMouseEvent.lastY;
        this.wheel = 0;
        this.button = nativeEvent.button;
        this.buttons = nativeEvent.buttons;

        if (nativeEvent instanceof WheelEvent) {
            // from
            // https://github.com/cedricpinson/osgjs/blob/master/sources/osgViewer/input/source/InputSourceMouse.js
            if (nativeEvent.wheelDelta !== undefined) {
                this.wheel = nativeEvent.wheelDelta / mouseDeltaFactor;
            } else if (nativeEvent.deltaMode === 1) {
                this.wheel = nativeEvent.deltaY / deltaYFactor;
            } else {
                this.wheel = nativeEvent.deltaY / (deltaYFactor * 10);
            }
        }
    }
}

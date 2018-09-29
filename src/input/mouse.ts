import Input from "input/input";
import CustomMouseEvent from "input/mouse-event";

export default class Mouse extends Input {
    private onMouseDown: EventListener;
    private onMouseUp: EventListener;
    private onMouseMove: EventListener;
    private onMouseWheel: EventListener;

    constructor(targetElement: HTMLCanvasElement) {
        super(targetElement);
        this.onMouseDown = this._onMouseDown.bind(this);
        this.onMouseUp = this._onMouseUp.bind(this);
        this.onMouseMove = this._onMouseMove.bind(this);
        this.onMouseWheel = this._onMouseWheel.bind(this);
        this.attach();
    }

    public attach() {
        this.targetElement.addEventListener("mousedown", this.onMouseDown, false);
        this.targetElement.addEventListener("mouseup", this.onMouseUp, false);
        this.targetElement.addEventListener("mousemove", this.onMouseMove, false);
        this.targetElement.addEventListener("mousewheel", this.onMouseWheel, false);
    }

    public detach() {
        this.targetElement.removeEventListener("mousedown", this.onMouseDown, false);
        this.targetElement.removeEventListener("mouseup", this.onMouseUp, false);
        this.targetElement.removeEventListener("mousemove", this.onMouseMove, false);
        this.targetElement.removeEventListener("mousewheel", this.onMouseWheel, false);
    }

    private _onMouseDown(event: MouseEvent) {
        this.fire("mousedown", new CustomMouseEvent(event));
    }

    private _onMouseUp(event: MouseEvent) {
        this.fire("mouseup", new CustomMouseEvent(event));
    }

    private _onMouseMove(event: MouseEvent) {
        this.fire("mousemove", new CustomMouseEvent(event));
        CustomMouseEvent.lastX = event.offsetX;
        CustomMouseEvent.lastY = event.offsetY;
    }

    private _onMouseWheel(event: MouseEvent) {
        this.fire("mousewheel", new CustomMouseEvent(event));
    }
}

import Input from "./input";
import CustomKeyboardEvent from "input/keyboard-event";

interface KeyMap {
    [key: number]: boolean;
}

type Key = number | string;

export default class Keyboard extends Input {
    public static KEY_TAB = 9;
    public static KEY_ENTER = 13;
    public static KEY_SHIFT = 16;
    public static KEY_CTRL = 17;
    public static KEY_ALT = 18;
    public static KEY_ESC = 27;
    public static KEY_A = 65;
    public static KEY_B = 66;
    public static KEY_C = 67;
    public static KEY_D = 68;
    public static KEY_E = 69;
    public static KEY_F = 70;
    public static KEY_G = 71;
    public static KEY_H = 72;
    public static KEY_I = 73;
    public static KEY_J = 74;
    public static KEY_K = 75;
    public static KEY_L = 76;
    public static KEY_M = 77;
    public static KEY_N = 78;
    public static KEY_O = 79;
    public static KEY_P = 80;
    public static KEY_Q = 81;
    public static KEY_R = 82;
    public static KEY_S = 83;
    public static KEY_T = 84;
    public static KEY_U = 85;
    public static KEY_V = 86;
    public static KEY_W = 87;
    public static KEY_X = 88;
    public static KEY_Y = 89;
    public static KEY_Z = 90;

    public static keyboardEvent = new CustomKeyboardEvent();

    public static toKeyCode(key: Key) {
        if (typeof key === "string") {
            return key.toUpperCase().charCodeAt(0);
        }

        return key;
    }

    private onKeyDown: EventListener;
    private onKeyUp: EventListener;
    private onKeyPress: EventListener;
    private _keyMap = {} as KeyMap;

    constructor(targetElement: HTMLElement) {
        super(targetElement);
        this.onKeyDown = this._onKeyDown.bind(this);
        this.onKeyUp = this._onKeyUp.bind(this);
        this.onKeyPress = this._onKeyPress.bind(this);
        this.attach();
    }

    public attach() {
        this.targetElement.addEventListener("keydown", this.onKeyDown, false);
        this.targetElement.addEventListener("keyup", this.onKeyUp, false);
        this.targetElement.addEventListener("keypress", this.onKeyPress, false);
    }

    public detach() {
        this.targetElement.removeEventListener("keydown", this.onKeyDown, false);
        this.targetElement.removeEventListener("keyup", this.onKeyUp, false);
        this.targetElement.removeEventListener("keypress", this.onKeyPress, false);
    }

    public isPressed(key: Key) {
        return !!this._keyMap[Keyboard.toKeyCode(key)];
    }

    private _onKeyDown(event: KeyboardEvent) {
        const ev = CustomKeyboardEvent.populate(Keyboard.keyboardEvent, event);
        this._keyMap[ev.keyCode] = true;
        this.fire("keydown", ev);
    }

    private _onKeyUp(event: KeyboardEvent) {
        const ev = CustomKeyboardEvent.populate(Keyboard.keyboardEvent, event);
        this._keyMap[ev.keyCode] = false;
        this.fire("keyup", ev);
    }

    private _onKeyPress(event: KeyboardEvent) {
        const ev = CustomKeyboardEvent.populate(Keyboard.keyboardEvent, event);
        this.fire("keypress", ev);
    }
}

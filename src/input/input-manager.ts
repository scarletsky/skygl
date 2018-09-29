import Mouse from "input/mouse";
import Keyboard from "input/keyboard";

type InputSource = Mouse | Keyboard;

interface InputSourceMap {
    [type: string]: InputSource;
}

export default class InputManager {
    public static sources = {
        mouse: null as Mouse,
        keyboard: null as Keyboard
    } as InputSourceMap;

    public static get(type: string) {
        return InputManager.sources[type];
    }

    public static add(source: InputSource) {
        let type;

        if (source instanceof Mouse) {
            type = "mouse";
        } else if (source instanceof Keyboard) {
            type = "keyboard";
        }

        if (type) {
            InputManager.sources[type] = source;
        }
    }
}

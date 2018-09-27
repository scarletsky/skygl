import Mouse from "input/mouse";

type InputSource = Mouse;

interface InputSourceMap {
    [type: string]: InputSource;
}

export default class InputManager {
    public static sources = {
        mouse: null as Mouse
    } as InputSourceMap;

    public static get(type: string) {
        return InputManager.sources[type];
    }

    public static add(source: InputSource) {
        if (source instanceof Mouse) {
            InputManager.sources.mouse = source;
        }
    }
}

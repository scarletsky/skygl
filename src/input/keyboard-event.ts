import InputEvent from "input/input-event";

export default class CustomKeyboardEvent extends InputEvent {
    public key: string;
    public keyCode: number;
    public ctrlKey: boolean;
    public shiftKey: boolean;
    public altKey: boolean;
    public metaKey: boolean;

    public static populate(customEvent: CustomKeyboardEvent, nativeEvent: KeyboardEvent) {
        customEvent.key = nativeEvent.key;
        customEvent.keyCode = nativeEvent.keyCode;
        customEvent.ctrlKey = nativeEvent.ctrlKey;
        customEvent.shiftKey = nativeEvent.shiftKey;
        customEvent.altKey = nativeEvent.altKey;
        customEvent.metaKey = nativeEvent.metaKey;
        customEvent.nativeEvent = nativeEvent;
        return customEvent;
    }

    constructor(nativeEvent?: KeyboardEvent) {
        super(nativeEvent);
    }
}

export default class InputEvent {
    public nativeEvent: Event;

    constructor(nativeEvent: Event) {
        this.nativeEvent = nativeEvent;
    }
}

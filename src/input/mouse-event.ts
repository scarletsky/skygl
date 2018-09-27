export default class CustomMouseEvent {
    public x: number;
    public y: number;
    public dx: number;
    public dy: number;
    public wheel: number;
    public type: string;
    public nativeEvent: MouseEvent;

    constructor(nativeEvent: MouseEvent) {
        this.nativeEvent = nativeEvent;
    }
}

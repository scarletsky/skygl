import EventEmitter from "core/event-emitter";

export default abstract class Input extends EventEmitter {
    public targetElement: HTMLElement;

    constructor(targetElement: HTMLElement) {
        super();
        this.targetElement = targetElement;
    }

    public abstract attach(): void;
    public abstract detach(): void;
}

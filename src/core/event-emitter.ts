export type Callback = (...args: any[]) => void;

interface EventCallback {
    scope: any;
    callback: Callback;
    once: boolean;
}

interface EventCallbackMap {
    [event: string]: EventCallback[];
}

export default class EventEmitter {
    public _callbacks: EventCallbackMap = {};

    public on(event: string, callback: Callback, scope = this as any, once: boolean = false) {
        if (this._callbacks[event] === undefined) {
            this._callbacks[event] = [];
        }

        this._callbacks[event].push({
            scope,
            callback,
            once
        });
    }

    public once(event: string, callback: Callback, scope = this as any) {
        this.on(event, callback, scope, true);
    }

    public off(event: string, callback?: Callback) {
        if (this._callbacks[event] === undefined) return;

        let index = -1;
        for (let i = 0, length = this._callbacks[event].length; i < length; i++) {
            if (this._callbacks[event][i].callback === callback) {
                index = i;
                break;
            }
        }

        if (callback === undefined && index === -1) {
            this._callbacks[event].length = 0;
        }

        if (index > -1) {
            this._callbacks[event].splice(index, 1);
        }
    }

    public fire(event: string, ...args: any[]) {
        const callbacks = this._callbacks[event];
        const onceFuncIndices: number[] = [];

        if (callbacks === undefined) return;

        callbacks.forEach((callback, i) => {
            const func = callback.callback;
            func.apply(callback.scope, args);

            if (callback.once) {
                onceFuncIndices.push(i);
            }
        });

        onceFuncIndices.forEach((index, i) => {
            callbacks.splice(index - i, 1);
        });
    }

    public hasEvent(event: string) {
        if (this._callbacks[event] === undefined) return false;
        return this._callbacks[event].length > 0;
    }
}

import EventEmitter from "core/event-emitter";

export interface Scriptable<T> {
    scripts: Array<Script<T>>;
    addScript(script: Script<T>): T;
    removeScript(script: Script<T>): T;
    execScript(script: Script<T>): void;
}

export abstract class Script<T> extends EventEmitter {
    public abstract name: string;

    public target = null as T;
    public _enabled = true;
    public _initialized = false;
    public _started = false;
    public _destroyed = false;

    public get enabled() {
        return this._enabled;
    }

    public set enabled(value: boolean) {
        if (this._enabled !== value) {
            this._enabled = value;
            value ? this.onEnable() : this.onDisable();
        }
    }

    public get initialized() {
        return this._initialized;
    }

    public set initialized(value: boolean) {
        if (!this._initialized && value) {
            this._initialized = value;
            this.onInitialize();
        }
    }

    public get started() {
        return this._started;
    }

    public set started(value: boolean) {
        if (!this._started && value) {
            this._started = value;
            this.onStart();
        }
    }

    public get destroyed() {
        return this._destroyed;
    }

    public set destroyed(value: boolean) {
        if (!this._destroyed && value) {
            this._destroyed = value;
            this.onDestroy();
        }
    }

    public attach(target: T) {
        this.target = target;
    }

    public detach() {
        this.target = null;
    }

    public onInitialize() {  }

    public onStart() {  }

    public onUpdate() {  }

    public onEnable() {  }

    public onDisable() {  }

    public onDestroy() {  }
}

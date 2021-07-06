import { isNil } from 'utils';
import { UniformInput, UniformInputOptions, UniformInputValue } from './UniformInput';

export interface UniformScopeOptions {
    [name: string]: Partial<UniformInputOptions>;
}

export class UniformScope {
    [name: string]: any;

    constructor(options: Partial<UniformScopeOptions> = {}) {
        this.fromJSON(options);
    }

    resolve(name: string): UniformInput {
        if (!this[name]) {
            this[name] = new UniformInput({ name });
        }

        return this[name];
    }

    fromJSON(options: Partial<UniformScopeOptions>) {
        for (const name in options) {
            const uniformInput = this.resolve(name);

            if (!isNil(options.value)) {
                uniformInput.setValue(options.value as UniformInputValue);
            }
        }
    }

    toJSON() {

    }
}

import { isNil } from 'utils';
import { UniformInput, UniformInputOptions, UniformInputValue } from './UniformInput';

export interface UniformScopeOptions {
    [name: string]: Partial<UniformInputOptions>;
}

export interface UniformScopeValues {
    [name: string]: UniformInput;
}

export class UniformScope {
    public values = {} as UniformScopeValues;

    constructor(options: Partial<UniformScopeOptions> = {}) {
        this.fromJSON(options);
    }

    resolve(name: string): UniformInput {
        if (!this.values[name]) {
            this.values[name] = new UniformInput({ name });
        }

        return this.values[name];
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

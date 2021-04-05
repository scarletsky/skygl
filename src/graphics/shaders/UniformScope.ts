import { UniformScopeInput } from './UniformScopeInput';

export class UniformScope {
    [key: string]: any;

    resolve(name: string) {
        if (!this[name]) {
            this[name] = new UniformScopeInput();
        }

        return this[name];
    }
}

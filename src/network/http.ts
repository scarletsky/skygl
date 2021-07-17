import { isNil } from 'utils';
import { Fetch } from './adapters/fetch';
import { XHR } from './adapters/xhr';

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export const request = !isNil(globalThis.fetch) ? Fetch : XHR;

export class Http {
    get(url: string, options = {} as any) {
        return request(url, Object.assign({ method: 'GET' }, options));
    }

    post(url: string, options = {} as any) {
        return request(url, Object.assign({ method: 'POST' }, options));
    }

    put(url: string, options = {} as any) {
        return request(url, Object.assign({ method: 'PUT' }, options));
    }

    delete(url: string, options = {} as any) {
        return request(url, Object.assign({ method: 'DELETE' }, options));
    }
}

export const http = new Http();

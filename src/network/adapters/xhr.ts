export interface XHROptions extends RequestInit{
    responseType: XMLHttpRequestResponseType;
}

export function XHR(url: string, options: Partial<XHROptions> = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const method = options.method || 'GET';
        const signal = options.signal;
        const responseType = options.responseType;
        let onAbort: EventListener = (_event) => {};

        if (responseType) xhr.responseType = responseType;

        if (signal) {
            onAbort = (_event) => {
                if (xhr.readyState === XMLHttpRequest.DONE) return;
                xhr.abort();
                return reject();
            };
            signal.addEventListener('abort', onAbort);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (signal) signal.removeEventListener('abort', onAbort);
                if (xhr.status >= 200 && xhr.status < 400) {
                    return resolve(xhr.response);
                } else {
                    return reject(xhr.responseText);
                }
            }
        };
        xhr.open(method, url, true);
        xhr.send(options.body);
    });
}

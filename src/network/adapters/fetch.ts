export interface FetchOptions extends RequestInit {
    responseType: XMLHttpRequestResponseType;
}

export function Fetch(url: string, options: Partial<FetchOptions> = {}) {
    return fetch(url, options)
        .then(res => {
            switch (options.responseType) {
                case 'arraybuffer': return res.arrayBuffer();
                case 'blob': return res.blob();
                case 'json': return res.json();
                case 'text':
                default:
                    return res.text();
            }
        });
}

import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';

function glsl() {
    return {
        transform(code, id) {
            if (/\.(glsl|vert|frag)/.test(id) === false) return;

            let transformedCode = 'export default ' + JSON.stringify(
                code.replace(/[ \t]*\/\/.*\n/g, '') // remove //
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                    .replace(/\n{2,}/g, '\n') // # \n+ to \n
            ) + ';';

            return {
                code: transformedCode,
                map: { mappings: '' }
            };
        }
    }
}

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/engine.js', format: 'umd', name: 'engine' }
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        glsl(),
        json(),
        serve({
            contentBase: './',
            port: 4444
        })
    ]
}

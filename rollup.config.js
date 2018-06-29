import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/engine.js', format: 'umd', name: 'engine' }
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        json(),
        serve({
            contentBase: './',
            port: 4444
        })
    ]
}

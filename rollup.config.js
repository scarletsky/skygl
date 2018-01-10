import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';

export default {
    input: 'src/index.ts',
    output: [
        { file: 'dist/engine.js', format: 'cjs' }
    ],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        json()
    ]
}

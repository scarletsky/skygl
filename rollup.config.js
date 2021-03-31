import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import glslify from 'rollup-plugin-glslify';


function generateConfig(name) {
    const config = {
        input: 'src/index.ts',
        output: {
            file: 'dist/skygl.js',
            format: 'iife',
            name: 'skygl'
        },
        plugins: [
            typescript(),
            glslify(),
        ]
    };

    if (name === 'dev') {
        config.plugins.push(
            serve({
                contentBase: './',
                port: 4444
            }),
        );
    }

    return config;
}

export default generateConfig(process.env.TARGET);

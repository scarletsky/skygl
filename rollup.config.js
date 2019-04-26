import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';

const builds = {
    dev: {
        output: [
            { file: 'dist/skygl.umd.js', format: 'umd', name: 'sky' }
        ]
    },
    cjs: {
        output: [
            { file: 'dist/skygl.js', format: 'cjs' }
        ]
    }
}

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

function genConfig(name) {
    const opts = builds[name];
    const config = {
        input: 'src/index.ts',
        output: opts.output,
        plugins: [
            typescript(),
            glsl(),
            json()
        ]
    };

    if (name === 'dev') {
        config.plugins.push(serve({
            contentBase: './',
            port: 4444
        }));
    }

    return config;
}

export default genConfig(process.env.TARGET);

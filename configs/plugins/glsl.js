const { createFilter } = require('rollup-pluginutils');

function compressShader(code) {
    let needNewline = false;
    return code.replace(/\\(?:\r\n|\n\r|\n|\r)|\/\*.*?\*\/|\/\/(?:\\(?:\r\n|\n\r|\n|\r)|[^\n\r])*/g, '').split(/\n+/).reduce((result, line) => {
        line = line.trim().replace(/\s{2,}|\t/, ' ');
        if (line.charAt(0) === '#') {
            if (needNewline) {
                result.push('\n');
            }
            result.push(line, '\n');
            needNewline = false;
        } else {
            result.push(line.replace(/\s*({|}|=|\*|,|\+|\/|>|<|&|\||\[|\]|\(|\)|-|!|;)\s*/g, '$1'));
            needNewline = true;
        }
        return result;
    }, []).join('').replace(/\n+/g, '\n');
}

export default function glsl(options = {}) {
    options = Object.assign({
        include: [
            '**/*.vs',
            '**/*.fs',
            '**/*.vert',
            '**/*.frag',
            '**/*.glsl'
        ]
    }, options);

    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'glsl',

        transform(code, id) {
            if (!filter(id)) return;

            if (options.compress !== false) {
                code = compressShader(code);
            }

            return {
                code: `export default ${JSON.stringify(code)}`,
                map: { mappings: '' }
            }
        }
    };
}

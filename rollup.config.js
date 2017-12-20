import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

function getVersion() {
  if (process.env.TRAVIS_TAG) {
    return process.env.TRAVIS_TAG;
  }

  return 'snapshot';
}

const VERSION = getVersion();

export default [
    {
        input: 'src/snex.js',
        output: {
            file: `browser/snex.${VERSION}.js`,
            format: 'umd'
        },
        name: 'snex',
        plugins: [
            resolve(),
            commonjs(),
        ]
    },

    {
        input: 'src/snex.js',
        output: {
            file: `browser/snex.${VERSION}.min.js`,
            format: 'umd'
        },
        name: 'snex',
        plugins: [
            resolve(),
            babel(),
            commonjs(),
            uglify(),
        ]
    },

    {
        input: 'src/snex.js',
        output: [
            { file: `dist/snex.js`, format: 'cjs' },
        ],
        external: ['eventemitter3'],
        plugins: [
            resolve(),
            babel(),
            commonjs(),
        ]
    }
];

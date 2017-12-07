const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const package = require('./package.json');

function getVersion() {
  if (process.env.TRAVIS_TAG) {
    return process.env.TRAVIS_TAG;
  }

  return 'snapshot';
}

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

const version = getVersion();

const config = {
  entry: {
    'snex': resolve('src', 'snex.js'),
  },
  output: {
    path: resolve('browser'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve('src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          },
        },
      },
    ],
  },
  plugins: [],
};

const nodeConfig = Object.assign({}, config, {
  output: Object.assign({}, config.output, {
    path: resolve('dist'),
    library: 'snex',
    libraryTarget: 'commonjs2',
    filename: `snex.js`,
  }),
});

const browserConfig = Object.assign({}, config, {
  output: Object.assign({}, config.output, {
    library: 'snex',
    libraryTarget: 'umd',
    filename: `snex.${version}.js`,
  }),
});

const minifyBrowserConfig = Object.assign({}, browserConfig, {
  output: Object.assign({}, browserConfig.output, {
    filename: `snex.${version}.min.js`,
  }),
});

minifyBrowserConfig.plugins = [new webpack.optimize.UglifyJsPlugin()];


module.exports = [
  nodeConfig,
  browserConfig,
  minifyBrowserConfig,
];

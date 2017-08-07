const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {version} = require('./package.json');

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

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

const browserConfigLatest = Object.assign({}, browserConfig, {
  output: Object.assign({}, browserConfig.output, {
    filename: `snex.latest.js`,
  }),
});

browserConfigLatest.plugins = [new CopyWebpackPlugin([{
  from: resolve('src', 'index.html'),
}])];


const minifyConfig = Object.assign({}, browserConfig, {
  output: Object.assign({}, browserConfig.output, {
    filename: `snex.${version}.min.js`,
  }),
});

minifyConfig.plugins = [new webpack.optimize.UglifyJsPlugin()];


const minifyConfigLatest = Object.assign({}, minifyConfig, {
  output: Object.assign({}, minifyConfig.output, {
    filename: `snex.latest.min.js`,
  }),
});


module.exports = [
  nodeConfig,
  browserConfig,
  browserConfigLatest,
  minifyConfig,
  minifyConfigLatest,
];

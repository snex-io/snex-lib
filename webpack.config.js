const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

const config = {
  entry: {
    'snex': resolve('src', 'snex.js'),
  },
  output: {
    path: resolve('dist'),
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
    filename: 'snex.js',
  }),
});

const browserConfig = Object.assign({}, config, {
  output: Object.assign({}, config.output, {
    library: 'snex',
    libraryTarget: 'umd',
    filename: 'snex-browser.js',
  }),
});

if (process.env.NODE_ENV === 'production') {
  const copy = new CopyWebpackPlugin([
    {
      from: resolve('src', 'index.html'),
    },
  ]);

  const uglify = new webpack.optimize.UglifyJsPlugin();
  browserConfig.plugins = [copy, uglify];
}

module.exports = [
  nodeConfig,
  browserConfig,
];

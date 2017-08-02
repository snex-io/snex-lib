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
    library: 'snex',
    libraryTarget: 'umd',
    filename: '[name].js',
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
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve('src', 'index.html'),
      },
    ]),
  ],
};

if (process.env.NODE_ENV === 'production') {
  const plugins = [
    new webpack.optimize.UglifyJsPlugin(),
  ];

  config.plugins.push(...plugins);
}

module.exports = config;

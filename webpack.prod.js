const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  output: {
    filename: 'banner-sdk.prod.min.js',
  },
  mode: 'production',
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ],
});

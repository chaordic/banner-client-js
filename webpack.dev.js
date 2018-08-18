const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'linx-banner.js',
  },
  devtool: 'source-map',
  mode: 'development',
});

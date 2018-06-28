const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'banner-sdk.dev.min.js',
  },
  mode: 'development',
});

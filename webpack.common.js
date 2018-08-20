const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: ['linx', 'banner'],
    libraryExport: 'BannerClient',
    libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          /src/,
          /theme/,
          /test/,
          /node_modules\/@linx-impulse/,
          /node_modules\/chai.*/,
          /node_modules\/sinon.*/,
        ],
        loader: 'babel-loader',
      },
    ],
  },
};

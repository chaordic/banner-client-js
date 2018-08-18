const webpack = require('./webpack.dev');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
    },
    webpack,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};

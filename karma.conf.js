module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.js',
    ],
    preprocessors: {
      'test/**/*.js': ['webpack'],
    },
    webpack: {},
    webpackMiddleware: {
      stats: 'errors-only',
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};

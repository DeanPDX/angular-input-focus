// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/angular-input-focus'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    junitReporter: {
      outputDir: '', // results will be saved as $outputDir/$browserName.xml
      outputFile: '../../TEST-RESULTS.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },
    reporters: ['junit', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless','Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};

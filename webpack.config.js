const path = require('path');

const inputFile = 'index.js';
let outputFile = 'jiminy.js';

if (process.env.NODE_ENV === 'production') {
  outputFile = 'jiminy.min.js';
}

const config = {
  context: __dirname,
  entry: `./src/${inputFile}`,
  output: {
    path: './dist',
    filename: outputFile,
    library: 'Jiminy',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: ['./src', './test'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  externals: {
    datalib: {
      root: 'dl',
      commonjs2: 'datalib',
      commonjs: 'datalib',
      amd: 'datalib'
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';
}

module.exports = config;

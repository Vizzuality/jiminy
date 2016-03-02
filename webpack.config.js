var path = require('path');

var inputFile  = 'index.js';
var outputFile = 'jiminy.js';
var config = {};
var plugins = [];

if(process.env.NODE_ENV === 'production') {
  outputFile = 'jiminy.min.js';
}

config = {
  context: __dirname,
  entry: './src/' + inputFile,
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
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
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: [ './src', './test' ],
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
  },
  plugins: plugins
};

module.exports = config;

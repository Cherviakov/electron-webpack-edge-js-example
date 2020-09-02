const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  plugins: [
    new WriteFilePlugin({ force: true }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          context: 'node_modules/electron-edge-js', 
          from: '**/*', 
          to: '' 
        },
      ]
    })
  ],
}

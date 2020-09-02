const path = require('path');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { spawn } = childProcess;

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    app: ['./app/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js','.jsx'],
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
  devtool: 'source-map',
  devServer: {
    port: 3000,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
    verbose: true,
      disableDotRule: false,
    },
    before () {
      console.log('starting main process');
      const main = spawn('npm', ['run','start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      });
      main.on('error', (err) => {
        console.error(err);
        process.exit(1);
      });
      main.on('close', process.exit);
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}

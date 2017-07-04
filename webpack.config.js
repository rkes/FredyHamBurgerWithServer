
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
      'babel-polyfill',
    path.join(__dirname, './src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
	  template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
	
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre","babel-preset-stage-3"]
      }
    }, 
	 { test: /\.css$/, loader: "style-loader!css-loader" },
	 {
      test: /\.json?$/,
      loader: 'json'
    },
	{test: /\.(jpe?g|png|gif|svg)$/i, loaders: ["file-loader?name=[name].[ext]","image-webpack-loader"]}]
  }
};
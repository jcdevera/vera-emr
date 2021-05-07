const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {
    publicPath: '/',
    hot: true,
    publicPath: 'http://localhost:8080/build',
    compress: true,
    port: 8080,
    historyApiFallback: true,   
    proxy: {
      '/api/**': 'http://localhost:3000/'
    }
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
              presets: [
              '@babel/preset-env',
              '@babel/preset-react'
              ]
            } 
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html'
    })
  ]
}
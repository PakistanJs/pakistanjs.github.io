const webpack            = require('webpack')
const path               = require('path')
const CSSNext            = require('postcss-cssnext')
const PostCSSImport      = require('postcss-import')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  favicon: './src/favicon.ico',
  inject: 'body'
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: '[name]_[hash]_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(jpg|png)$/, loader: 'url-loader?limit=10000' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { modules: true, localIdentName:'[name]__[local]', importLoaders: 1 } },
            { loader: 'postcss-loader', options: { plugins: () => [CSSNext, PostCSSImport] } },
          ]
        }),
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin('[name]_[hash]_bundle.css'),
    new CleanWebpackPlugin('dist')
  ],
  devServer: {
    historyApiFallback: true
  }
}

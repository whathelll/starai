const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // entry: './src/client.js',
  entry: {main: ["./src/client.js", "./src/public/sass/starai.scss"]},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './src/public', to: './' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ReloadPlugin(),
    new ExtractTextPlugin('style-starai.css'),
  ],
  module: {
    rules: [{
      // test: /\.scss$/,
      // exclude: /node_modules/,
      // include: [path.resolve(__dirname, "src/public/sass")],
      // use: [{
      //   loader: "style-loader" // creates style nodes from JS strings
      // }, {
      //   loader: "css-loader" // translates CSS into CommonJS
      // }, {
      //   loader: "sass-loader", // compiles Sass to CSS
      //   options: {
      //     includePaths: ["src/public/sass/"]
      //   }
      // }]
    },
    {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        // use: ['css-loader', 'sass-loader']
        use: "css-loader!sass-loader",
        publicPath: "dist"
      })
    }
    ]
  },
};

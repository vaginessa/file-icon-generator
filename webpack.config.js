var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var mycssExtractTextPlugin = new ExtractTextPlugin(1, 'style.css');
var vendorExtractTextPlugin = new ExtractTextPlugin(2, 'vendor.css');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  //__PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  entry: {
    app: "./source/index.js",
    //vendor: ["redux"]
    // vendor: ["jquery", "./vendor/web-animations.min.js", "./vendor/socket.io.js"]
  },
  output: {
    path: __dirname + '/dist/',
    filename: "./bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader:  vendorExtractTextPlugin.extract('css') },
      { test: /\.scss$/, loader: mycssExtractTextPlugin.extract('css!sass') },
      { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=150000&name=./images/[name].[ext]' },
      //{
      //  loader: "babel-loader",
      //
      //  exclude: /node_modules/ ,
      //
      //   Only run `.js` and `.jsx` files through Babel
      //  test: /\.jsx?$/,
      //
      //   Options to configure babel with
      //  query: {
      //    plugins: ['transform-runtime'],
      //    presets: ['es2015', 'react'],
      //  }
      //},
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    mycssExtractTextPlugin,
    vendorExtractTextPlugin,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    definePlugin
  ]
};
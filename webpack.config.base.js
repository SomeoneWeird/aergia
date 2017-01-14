/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import validate from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'

import {
  dependencies as externals
} from './app/package.json';

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    {
      test: /\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'resolve-url',
        'sass'
      ]
    }, {
      test: /\.(?:png|jpg)$/,
      loader: 'url-loader',
      query: {
        limit: 10000
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ],

  externals: Object.keys(externals || {}),

  node: {
    fs: 'empty'
  },

  target: 'web'
});

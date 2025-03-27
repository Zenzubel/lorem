// vars
const paths = require('./paths');
const address = require('address');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// plugins

// config
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.src,
    publicPath: '/',
    compress: true,
    hot: true,
    open: true,
    inline: true,
    port: 8080,
    host: address.ip(),
    proxy: {
      '/api/**': {
        target: `${address.ip()}:8080`,
        secure: false,
        changeOrigin: true,
      },
    },
    before(app, server) {
      // https://github.com/webpack/webpack-dev-server/issues/1271#issuecomment-379792541
      server._watch(`./src/partials/**/*`);
      server._watch(`./src/views/*`);
    },
  },

  module: {
    rules: [
      // SCSS
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});

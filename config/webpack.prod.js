// vars
const paths = require('./paths');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const isCompressCss = true;

// plugings
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const TerserPlugin = require('terser-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CriticalCssPlugin = require('critical-css-webpack-plugin');

// config
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: (chunkData) => {
      return 'js/[name].js';
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '70',
      },

      plugins: [
        imageminMozjpeg({
          quality: 70,
          progressive: true,
        }),
      ],
    }),

    // new CriticalCssPlugin(), // ?

    new ZipPlugin({
      filename: `${process.cwd()}_dist.zip`,
    }),
  ],
  module: {
    rules: [
      // SCSS
      {
        test: /\.(scss|css)$/,
        exclude: [path.join(paths.src, '/scss/inline.scss')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  isCompressCss ? require('cssnano') : () => {},
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 versions'],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      // SCSS
      {
        test: /\.(scss|css)$/,
        include: [path.join(paths.src, '/scss/inline.scss')],
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head', // insert style tag inside of <head>
              injectType: 'singletonStyleTag', // this is for wrap all your style in just one style tag
            },
          },
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

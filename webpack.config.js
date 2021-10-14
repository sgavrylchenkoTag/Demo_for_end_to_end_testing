const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  let styleLoader;
  let cssExtractPlugin;
  let isSourceMap;

  switch (env.mode) {
    case 'production':
      cssExtractPlugin = new MiniCssExtractPlugin({
        filename: 'main.css',
      });
      styleLoader = { loader: MiniCssExtractPlugin.loader };
      isSourceMap = false;
      break;

    default:
      styleLoader = { loader: 'style-loader' };
      isSourceMap = 'inline-source-map';
  }

  const config = {
    mode: env.mode,
    entry: './src/index.js',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devtool: isSourceMap,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss/,
          use: [
            styleLoader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  exportLocalsConvention: 'camelCase',
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },

    devServer: {
      compress: true,
      open: true,
      port: 6289,
      historyApiFallback: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',

        // favicon: 'public/logo.ico',
      }),
      new CleanWebpackPlugin(),
    ],

    resolve: {
      alias: {
        Components: resolve(__dirname, 'src/components/'),
        Containers: resolve(__dirname, 'src/containers/'),
        Actions: resolve(__dirname, 'src/actions/'),
        images: resolve(__dirname, 'src/images/'),
      },
    },
  };

  if (env.mode === 'production') {
    config.plugins.push(cssExtractPlugin);
  }

  return config;
};

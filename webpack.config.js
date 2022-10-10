const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

const IS_PROD = false

const mod = {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      exclude: '/node_modules/',
      use: [
        {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/react'] }
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
      ]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [

        // { loader: 'style-loader' },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: path.resolve(__dirname, 'dist')
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              mode: 'local',
              localIdentName: IS_PROD ? '[hash:base64:16]' : '[local]--[hash:base64:5]'
            },
            url: false,
          }
        },
        { loader: 'sass-loader' },
      ]
    }
  ]
}

module.exports = {
  mode: IS_PROD ? 'production' : 'development',

  entry: './src/main.tsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },

  module: mod,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "style/global.css",
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3001,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    alias: {
      "@atoms": path.resolve(__dirname, "src/components/atoms"),
      "@molecules": path.resolve(__dirname, "src/components/molecules"),
      "@organisms": path.resolve(__dirname, "src/components/organisms"),
      "@bundles": path.resolve(__dirname, "src/components/_bundles"),
      "~": path.resolve(__dirname, "src")
    },
  },

  target: 'web',
};

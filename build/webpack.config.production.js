const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = merge(baseConfig, {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vendor: ['vue', 'vue-router', 'vuex']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  output: {
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }, {
        test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/'], { root: __dirname, exclude:['web.config'], verbose: true, dry: false }),
    new ExtractPlugin({
      filename: 'styles.[hash:8].css',
      allChunks: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].[chunkhash:8].css'
    })
  ]
})

module.exports = config
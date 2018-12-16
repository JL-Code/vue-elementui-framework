const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 4042,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '../index.html'
  },
  hot: true
}

const config = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }, {
        test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
      }
    ]
  },
  devtool: '#cheap-module-eval-source-map',
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ]
})

module.exports = config
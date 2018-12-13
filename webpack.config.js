const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isDev = process.env.Node_ENV === 'development'

const config = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options:
            {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/template.html')
    })
  ],
  // 设置import vue的版本
  // resolve: {
  //   alias: {
  //     'vue': path.join(__dirname, 'node_modules/vue/dist/vue.esm.js')
  //   }
  // }
}

if(isDev) {
  config.module.rules.push({
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
  })
  config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
      port: 4042,
      host: '0.0.0.0',
      overlay: {
        errors: true
      },
      historyApiFallback: {
        index: '/index.html'
      },
      hot: true
    }
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue', 'vue-router', 'vuex']
  }
  config.optimization = {
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
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
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
  )
  config.plugins.push(
    new CleanWebpackPlugin(['dist/'], { root: __dirname, exclude:['web.config'], verbose: true, dry: false }),
    new ExtractPlugin({
      filename: 'styles.[hash:8].css',
      allChunks: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].[chunkhash:8].css'
    })
  )
}

module.exports = config
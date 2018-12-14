const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + 'node_modules',
        include: __dirname + 'src'
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
      template: path.join(__dirname, '../src/template.html')
    })
  ]
}

module.exports = config
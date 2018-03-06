const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },
  // devtool: 'eval-source-map',
  devServer: {
    contentBase: './lib',
    port: 1234,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-es2015',
              '@babel/preset-stage-3',
              '@babel/preset-stage-0',
            ],
            plugins: [
              require('@babel/plugin-transform-runtime'),
              require('@babel/plugin-proposal-object-rest-spread'),
              require('@babel/plugin-transform-react-jsx'),
              require('@babel/plugin-proposal-class-properties'),
              require('@babel/plugin-syntax-class-properties'),
            ],
          },
        },
      },
    ],
  },
}
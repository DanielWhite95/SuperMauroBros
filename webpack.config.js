const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  mode: "development",
  plugins: [
      new CopyWebpackPlugin({
          patterns: [
              'index.html',
              { from: 'shaders', to: 'shaders'},
              { from: 'models', to: 'models'},
              { from: 'textures', to: 'textures'},
              { from: 'engine', to: 'engine' },
              { from: 'lib', to: 'lib'}
          ]
      })
  ]
};

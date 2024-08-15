const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
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

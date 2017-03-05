var path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-async-to-generator']
      }
    },
    {
      test: /\.styl/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.jsx'],
  output: { path: './dist/', filename: 'bundle.js' },
  devtool: '#source-map'
};

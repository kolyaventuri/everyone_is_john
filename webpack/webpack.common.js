const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    path.join(process.cwd(), 'src/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(process.cwd(), 'public/javascripts'),
    publicPath: '/javascripts'
  }
};

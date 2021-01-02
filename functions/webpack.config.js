/**
 * Build functions with their deps to single files in /functions/dist
 * Typescript is supported.
 */

const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    events: path.join(__dirname, 'src/events.ts'),
  },
  mode: 'development' || process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' && 'source-map',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.join(__dirname, 'src')],
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'static' : 'disabled',
      generateStatsFile: false,
      statsOptions: { source: true },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

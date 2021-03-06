const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const libraryConfig = {
  mode: 'production',
  entry: './src/index.ts',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    library: 'animekit',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  stats: {
    // Ignore dynamic module loading warnings
    warningsFilter: [/node_modules\/got/, /node_modules\/fluent-ffmpeg/]
  },
  target: 'node'

}

const cliConfig = {
  mode: 'production',
  entry: './src/cli.ts',
  externals: [{ animekit: '../lib' }, nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cli.js'
  },
  stats: {
    // Ignore dynamic module loading warnings
    warningsFilter: [/node_modules\/yargs/, /node_modules\/got/, /node_modules\/fluent-ffmpeg/]
  },
  target: 'node'
}

const cliBundle = {
  mode: 'production',
  entry: './src/cli.ts',
  // externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: 'cli.bundle.js'
  },
  stats: {
    // Ignore dynamic module loading warnings
    warningsFilter: [/node_modules\/yargs/, /node_modules\/got/, /node_modules\/fluent-ffmpeg/]
  },
  target: 'node'
}

module.exports = [libraryConfig, cliConfig, cliBundle]

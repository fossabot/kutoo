const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    entry: './src/lib/index.ts',
    devtool: 'inline-source-map',
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        library: 'animekit',
        libraryTarget: 'umd',
        libraryExport: "default",
        path: path.resolve(__dirname, 'dist/lib'),
    },
};
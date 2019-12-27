const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const libraryConfig = {
    mode: 'production',
    entry: './src/lib/index.ts',
    target: 'node',
    module: {
        rules: [{
            test: /\.ts$/,
            loader: require.resolve('ts-loader'),
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'animekit.js',
        library: 'animekit',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'lib'),
    },
    plugins: [
        new CleanWebpackPlugin(),

        new TypedocWebpackPlugin({
            out: path.resolve(__dirname, 'docs'),
            tsconfig: './tsconfig.json',
            theme: 'minimal'
        }, './src'),
    ],
    externals: [nodeExternals()],
};

const cliConfig = {
    mode: 'production',
    entry: './src/cli/index.ts',
    target: 'node',
    module: {
        rules: [{
            test: /\.ts$/,
            loader: require.resolve('ts-loader'),
        }],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'cli.js',
        path: path.resolve(__dirname, 'cli'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    externals: [nodeExternals()],
};

module.exports = [libraryConfig, cliConfig]
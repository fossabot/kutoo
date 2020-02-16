const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

let libraryConfig = {
    mode: 'production',
    entry: './src/lib/index.ts',
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
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
        libraryTarget: 'commonjs2',
        libraryExport: "default",
        path: path.resolve(__dirname, 'dist/lib'),
    },
    target: 'node',

};

let cliConfig = {
    mode: 'production',
    entry: './src/lib/cli.ts',
    externals: [{ animekit: '../lib'},nodeExternals()],
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
                    'ts-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        filename: 'cli.js'
    },
    stats: {
        // Ignore warnings due to yarg's dynamic module loading
        warningsFilter: [/node_modules\/yargs/]
    },
    target: 'node'
};

let cliBundle = {
    mode: 'production',
    entry: './src/lib/cli.ts',
    // externals: nodeExternals(),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: 'cli.bundle.js'
    },
    stats: {
        // Ignore warnings due to yarg's dynamic module loading
        warningsFilter: [/node_modules\/yargs/]
    },
    target: 'node'
};

module.exports = [libraryConfig, cliConfig, cliBundle]
const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
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
        new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        })
    ]
};
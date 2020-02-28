module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
        project: './tsconfig.json'
    },
    ignorePatterns: [ 'node_modules/', 'test/', 'temp/', 'dist/', 'release/']
}
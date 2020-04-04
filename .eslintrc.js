module.exports = {
    extends: 'standard-with-typescript',
    plugins: ["jest"],
    parserOptions: {
        project: './tsconfig.json'
    },
    env: {
        'node': true,
        'jest': true
    },
    ignorePatterns: [ 'node_modules/', 'temp/', 'dist/', 'release/', 'tester/', 'test/']
}
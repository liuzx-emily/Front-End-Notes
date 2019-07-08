const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/js/html插件 inline化'),
        filename: 'config7-[name].js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/config6-多页面template1.html',
            filename: 'config7 页面1.html',
            chunks: ["a", "b"],
            inlineSource: 'a.js$'
        }),
        new htmlWebpackPlugin({
            template: './src/config6-多页面template2.html',
            filename: 'config7 页面2.html',
            excludeChunks: ["main"],
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin()
    ]
};

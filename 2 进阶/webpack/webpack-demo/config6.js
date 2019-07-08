const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js',
        a: './src/script/a.js',
        b: './src/script/b.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/html插件 多页面/config6-[name].js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/config6-多页面template1.html',
            filename: 'js/html插件 多页面/config6 页面1.html',
            inject: 'body',
            chunks: ['main', 'b']
        }),
        new htmlWebpackPlugin({
            template: './src/config6-多页面template2.html',
            filename: 'js/html插件 多页面/config6 页面2.html',
            inject: 'head',
            excludeChunks: ["main", "side"]
        })
    ]
};

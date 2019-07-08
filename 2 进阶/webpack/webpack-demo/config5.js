const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/html插件/config5-[name].js',
        publicPath: 'http://lzx.com'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/config5-项目上线template.html',
            filename: 'js/html插件/config5-项目上线.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true
            }
        })
    ]
};

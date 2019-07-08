const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/html插件/config4-[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/config4-bundle插在不同位置.html',
            filename: 'js/html插件/config4-生成的bundle自动插在不同位置.html',
            inject: false
        })
    ]
};

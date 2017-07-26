const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/html插件/config3-[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/config3-html插件使用的template.html',
            filename: 'js/html插件/config3-自动生成的html.html',
            inject: 'body',
            lzxTitle: '钢之炼金术师',
            lzxSth: { name: 'emily', age: 12 }
        })
    ]
};

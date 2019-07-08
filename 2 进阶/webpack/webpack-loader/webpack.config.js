var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + "/dist",
        filename: "js/[name].bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            inject: "body",
            title: "钢之炼金术师"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader', {
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            require('postcss-import')(), //处理import的css
                            require('autoprefixer')()
                        ]
                    }
                }
            ]
        }, {
            test: /\.js$/,
            include: [path.resolve(__dirname, "src")],
            loader: 'babel-loader',
            options: {
                presets: ['env']

            }
        }, {
            test: /\.less$/,
            use: ["style-loader", "css-loader", {
                loader: "postcss-loader",
                options: {
                    plugins: [
                        //require('postcss-import')(), //用了less-loader，可以不用这行
                        require('autoprefixer')()
                    ]
                }
            }, "less-loader"]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", {
                loader: "postcss-loader",
                options: {
                    plugins: [require('autoprefixer')]
                }
            }, "sass-loader"]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.tpl$/,
            loader: "ejs-loader"
        }, {
            test: /\.(jpg|png|gif)$/i,
            use: [{
                loader: "url-loader",
                query: {
                    limit: 200, //200kb为分界线
                    name: "assets/[name]-[hash:5].[ext]"
                }
            }, "image-webpack-loader"]
        }]
    }
}

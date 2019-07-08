const path = require('path');
module.exports = {
    entry: {
        main: './src/script/main.js',
        side: './src/script/side.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/config2-多入口-[name]-[chunkhash].js'
    }
};

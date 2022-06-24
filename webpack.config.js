const path = require("path");
const webpack = require("webpack");

//webpack 3 properties: entry, output, and mode
//1. declare entry property, this is the root of the bundle and the beginning of the dependency graph
//2. bundled code and output into a specified folder
//3. mode in which we want the webpack to run; by default is production mode, but we want to run in developement mode.
module.exports = { 
    entry: './assets/js/script.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),  //folder 'dist', filename: __dirname
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    mode: 'development'
};
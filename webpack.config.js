var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {        
        vendor: ["jquery, lodash"],
        app: ["babel-polyfill", "./src/app.js", "./src/scss/main.scss"], 
    },
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-cheap-module-source-map",
    output: {        
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "build")
    },
    module: {
        loaders: [
            { 
                test: /\.(js|jsx)$/, 
                loader: "eslint-loader", 
                exclude: /node_modules/,
                enforce: "pre"
            },  
            {
                test: /\.html$/,                
                loader: "html-loader"
            },
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "es2015", "stage-0", "stage-1", "react"]                    
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]       
                }),
            }            
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].bundle.css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: "index.html"
        }),   
        //new webpack.optimize.CommonsChunkPlugin("vendor.js"),
        new CleanWebpackPlugin(["build/*.js", "build/*.css"])
    ]    
};
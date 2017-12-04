var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

const VENDOR_LIBS = [
    "jquery", "lodash", "babel-polyfill",
    "react", "react-dom", "react-redux", "react-router",
    "redux", "redux-form", "redux-thunk"
];

module.exports = {
    entry: {                
        bundle: ["./src/app.js", "./src/scss/main.scss"], 
        vendor: VENDOR_LIBS
    },
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval-cheap-module-source-map",
    output: {                
        path: path.resolve(__dirname, "build"),
        filename: "[name].[hash].js",
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
        new CleanWebpackPlugin(["build/*.js", "build/*.css"]),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),        
        new HtmlWebpackPlugin({
            template: "index.html"
        }),        
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })        
    ]    
};
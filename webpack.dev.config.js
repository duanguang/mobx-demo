/**
 * Created by DuanG on 2017/2/15.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var entry = {
    'common/core': [
        'react', 'react-dom', 'react-router', 'mobx-react', 'mobx'
    ],
    'index': './src/entry/index'
};
module.exports = {
    entry: entry,
    resolve: {
        modulesDirectories: ['', 'src', 'node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json']
    },
    output: {
        path: path.join(__dirname, 'app'),
        publicPath: "/app/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|typings)/,
                include: /src/,
                loader: 'react-hot'
            },
            /*{
                test: /\.js?$/,
                exclude: /(node_modules|typings)/,
                include: /src/,
                loader: 'babel'
            },*/
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)\??.*$/i,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common/core', 'common/core.js'),
        //new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            files: {
                "js": ["assets/head_bundle.js", "assets/main_bundle.js"],
            }
        }),
        new OpenBrowserPlugin({ url: "http://localhost:8889" }),
    ]
};

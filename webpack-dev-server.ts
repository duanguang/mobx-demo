/**
 * Created by DuanG on 2017/2/15.
 */
var request = require('request');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");

var port = 8889;
//config.entry['core'].unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var compiler = webpack(config);

var bundleStartTime;

compiler.plugin('compile', () => {
    console.info('Bundling...');
    bundleStartTime = Date.now();
});

compiler.plugin('done', () => {
    console.info(`Bundled in ${Date.now() - bundleStartTime} ms. ${new Date()}`);
});

var server = new WebpackDevServer(compiler, {
    contentBase: ``,
    hot: true,
    historyApiFallback: {
        rewrites: [
            {from: /\//, to: '/app/index.html'},
        ],
    },
    quiet: false,
    noInfo: false,
    publicPath: "/app/",
    stats: {colors: true},


});

server.listen(port, null, function () {
    console.log(`http://localhost:${port}`);
});
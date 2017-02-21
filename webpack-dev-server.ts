/**
 * Created by DuanG on 2017/2/15.
 */
var request = require('request');
import * as core from 'express-serve-static-core';
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");

var port = 8889;
//config.entry['core'].unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server");
/*config.plugins.push(new webpack.HotModuleReplacementPlugin());*/
config.entry['common/core'].unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server");
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
    contentBase: `./views`,
    hot: true,
    historyApiFallback: {
        rewrites: [
            {from: /\//, to: '/app/index.html'},
        ],
    },
    host: '0.0.0.0',
    quiet: false,
    noInfo: false,
    publicPath: "/app/",
    stats: {colors: true},

    proxy: {
        '*': {
            //path: /^\/(?!(webpack\-dev\-server)|(webpack)|(sockjs\-node)|(Q\.Draft)).*$/i,
            target: 'http://tstq.360kad.com/',
            //host: 'tstq.360kad.com',
            secure: false,
            bypass: function (req, res, proxyOptions) {
                debugger;
                if (req.originalUrl === '/') {
                    return '/dist/index.html';
                }
            },
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('host','tstq.360kad.com');
                //proxyReq.setHeader('cookie', 'K2_Web_User=kid_6a7673b88e134cb4b5d19359e72966b2; __juid=1473405786317748920366225; KadQUserId=147011');
                proxyReq.setHeader('cookie', '__juid=1473328965118367134601374; __newnuid=AAAAAFfRN2tDmAZ6i1eSAg==; K2_Web_User=kid_b990ccfe48e04873a0b7e6069619abed; KadQUserId=145011;PharCusCode=2282560011');
            }
        }
    },

    setup: function (app: core.Express) {
    }

});

server.listen(port, null, function () {
    console.log(`http://localhost:${port}`);
});
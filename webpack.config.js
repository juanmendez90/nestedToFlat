var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, "src/index.js"),
        vendor: [
            "material-ui",
            "mobx",
            "mobx-react",
            "react",
            "react-dom",
            "react-tap-event-plugin",
        ],

    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ["babel"],
                include: /(src)/,
                cacheDirectory: true
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
                name        : "vendor",
                filename: "vendor.bundle.js",
            }
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.template.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        https: true,
        port: 5000,
        colors: true
    }
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: ['./src/index'],

    mode: 'development',
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World',
            inject: false,
            template: require('html-webpack-template'),
            headHtmlSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1">'
        }),
        new webpack.NamedModulesPlugin()
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader']
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
};

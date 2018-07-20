const merge = require("webpack-merge");
const production = require("./webpack.prod.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge.smart(production, {
    plugins: [new BundleAnalyzerPlugin()]
});

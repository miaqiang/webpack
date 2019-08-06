const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({}),
		 	new UglifyJsPlugin(
			
				{
					uglifyOptions: {
					warnings: false,
				 	compress: {
						drop_debugger:true,
						drop_console:true
					},
				}
			}
		) 
			/* new UglifyJsPlugin({
				/* uglifyOptions: {
					warnings: false,
				 	compress: {
						drop_debugger:true,
						drop_console:true
					}, */
			/*}, */
			/*}) */]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style/[name].css',
			chunkFilename: 'style/[name].chunk.css'
		}),
	],
	output: {
		filename: 'scripts/[name].[contenthash].js',
		chunkFilename: 'scripts/[name].[contenthash].js'
	}
}

module.exports = merge(commonConfig, prodConfig);
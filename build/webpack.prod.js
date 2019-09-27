const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							//publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						/* options: {
							importLoaders: 2,
						} */
					},
					'less-loader',
					//'postcss-loader'
				]
			}, {
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							//publicPath: '../',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
					//'postcss-loader'
				]
			}

		]
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin(

				{
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_debugger: true,
							drop_console: true
						},
					}
				}
			)
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		/* 	extractCSS,
			extractLESS, */
		new MiniCssExtractPlugin({
			filename: 'style/[name].css',
			chunkFilename: 'style/[name].chunk.css'
		}),
	],
	output: {
		filename: 'script/[name].[contenthash].js',
		chunkFilename: 'script/[name].[contenthash].js',
	}
}

module.exports = merge(commonConfig, prodConfig);
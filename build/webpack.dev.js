const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

let target = 'http://10.109.23.159:8083';//小明电脑


const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		// contentBase: './dist',
		//open: true,
		port: 8081,
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		},
		// publicPath: 'http://localhost:3000/dist/',
		/* proxy: {
			'/': target
		} */
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader?sourceMap',
				//'postcss-loader?sourceMap',
				'less-loader?sourceMap',
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader?sourceMap',
				//'postcss-loader?sourceMap',
				'css-loader?sourceMap',
			],
			//include: /src/,
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	output: {
		filename: 'scripts/[name].js',
		chunkFilename: 'scripts/[name].js',
		publicPath: "http://localhost:8081/"
	}
}

module.exports = merge(commonConfig, devConfig);
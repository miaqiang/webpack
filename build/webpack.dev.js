const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

let target='http://10.109.23.159:8083';//小明电脑


const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 3000,
		hot: true,
		 proxy: {
            '/': target
        }
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				'style-loader', 
				'css-loader?sourceMap',
				'sass-loader?sourceMap',
				'postcss-loader?sourceMap'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader?sourceMap',
				'css-loader?sourceMap',
				'postcss-loader?sourceMap'
			]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	output: {
		filename: 'scripts/[name].js',
		chunkFilename: 'scripts/[name].js',
	}
}

module.exports = merge(commonConfig, devConfig);
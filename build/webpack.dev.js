const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

let target = 'http://vm31.leap.com:8070"';//vm31

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		// contentBase: './dist',

		port: 8081,
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		},

		//contentBase: './',
		open: true,//利用devServer实现代理，缺点：只有开发模式能够使用
		publicPath: 'http://localhost:8081/',
		openPage: 'dev.html',
		proxy: {
			'/leapid-admin': target,
		}
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader?sourceMap',
				//'postcss-loader?sourceMap',
				{
					loader: 'less-loader?sourceMap',
					options: {
						javascriptEnabled: true
					}
				}
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
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"windows.jQuery": "jquery",
			jQuery: "jquery",
			React: 'react',
			Cookies: "js-cookie",

		}),
	],
	output: {
		filename: 'scripts/[name].js',
		chunkFilename: 'scripts/[name].js',
		publicPath: "http://localhost:8081/"
	}
}

module.exports = merge(commonConfig, devConfig);
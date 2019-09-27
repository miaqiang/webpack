const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');


const makePlugins = (configs) => {
	const plugins = [
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"windows.jQuery": "jquery",
			jQuery: "jquery",
			React: 'react',
			Cookies: "js-cookie"
		}),
	];
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: './template.html',
				filename: `../${item}.html`,
				chunks: ['runtime', 'vendors', item]
			})
		)
	});
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
	files.forEach(file => {
		if (/.*\.dll.js/.test(file)) {
			plugins.push(new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file),
				//publicPath: 'dist/',
				//outputPath: "dist/",
			}))
		}
		if (/.*\.manifest.json/.test(file)) {
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file),
				//outputPath: './dll'
			}))
		}
	});
	return plugins;
}


const configs = {
	entry: {
		index: './app/index.js',
		// header:'./src/index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		/*alias: {
			child: path.resolve(__dirname, '../src/a/b/c/child')
		}*/
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				// include: path.resolve(__dirname, '../src'),
				use: [{
					loader: 'babel-loader',
					options: {
						//publicPath: '../',
						"presets": [
							["@babel/preset-env",
								/* {
									"useBuiltIns": "usage",
									"corejs": 2,
									//"modules": 'auto'
								} */

							],

							"@babel/preset-react"
						],
						"plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]
					}
				}]
			}, {
				test: /\.(jpg|png|gif|jpeg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name]_[hash].[ext]',
						//outputPath: 'images/',
						publicPath: '../',
						limit: 10240
					}
				}
			}, {
				test: /\.(otf|eot|ttf|svg||woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: 'fonts/[name].[ext]',
						// outputPath: 'style/',
						publicPath: '../',
						limit: 10240
					}
				}
			}]
	},
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors',
				}
			}
		}
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: './dist/',//访问路径
	}
}

configs.plugins = makePlugins(configs);

module.exports = configs
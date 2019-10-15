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
			ReactRedux: 'react-redux',
			Cookies: "js-cookie",


		}),
	];
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: './public/template.html',
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
		index: './src/pages/index.js',
		// header:'./src/index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'src': path.resolve(__dirname, '../src')
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				// include: path.resolve(__dirname, '../src'),
				use: [{
					loader: 'babel-loader',
				}]
			}, {
				test: /\.(jpg|png|gif|jpeg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name]_[hash].[ext]',
						//outputPath: 'images/',
						publicPath: process.env.NODE_ENV == "production" ? '../' : "",
						/* 
						开启server，dev模式时
						css文件和js文件打包在一起的，没有进行分离
						publickPath为"../"的话，会以当前浏览器的访问地址为根路径
						访问地址会是，http://localhost:8082/pm/../images/xxx.png
						publickPath为""时，访问地址会以output里的publicPath地址为准
						访问地址会是：http://localhost:8083/images/xxx.png

						build模式时,
						css文件单独提取出来，在dist/style文件
						publicPath为"",会以当前css文件的路径为根路径，
						访问地址是：http:8082/pm/dist/style/dist/images/xxx.png;
						publicPath为"",会以当前css文件的路径的上一级为根路径，
						访问地址是：http:8082/pm/dist/images/xx.png;
						 */
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
						publicPath: process.env.NODE_ENV == "production" ? '../' : "",
						/* 
						开启server，dev模式时
						css文件和js文件打包在一起的，没有进行分离
						publickPath为"../"的话，会以当前浏览器的访问地址为根路径
						访问地址会是，http://localhost:8082/pm/../images/xxx.png
						publickPath为""时，访问地址会以output里的publicPath地址为准
						访问地址会是：http://localhost:8083/images/xxx.png

						build模式时,
						css文件单独提取出来，在dist/style文件
						publicPath为"",会以当前css文件的路径为根路径，
						访问地址是：http:8082/pm/dist/style/dist/images/xxx.png;
						publicPath为"",会以当前css文件的路径的上一级为根路径，
						访问地址是：http:8082/pm/dist/images/xx.png;
						 */
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
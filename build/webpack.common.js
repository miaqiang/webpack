const path = require('path');
const fs=require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin');
const webpack = require('webpack');


const makePlugins = (configs) => {
	const plugins = [
		new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "windows.jQuery": "jquery",
            jQuery: "jquery",
            React :'react',
        }),
	];
	Object.keys(configs.entry).forEach(item => {
		plugins.push(
			new HtmlWebpackPlugin({
				template: 'src/htmlTemplate/index.html',
				filename: `${item}.html`,
				chunks: ['runtime', 'vendors', item]
			})
		)
	});
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
	files.forEach(file => {
		if(/.*\.dll.js/.test(file)) {
			plugins.push(new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file)
			}))
		}
		if(/.*\.manifest.json/.test(file)) {
			plugins.push(new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file)
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
		/*alias: {
			child: path.resolve(__dirname, '../src/a/b/c/child')
		}*/
	},
	module: {
		rules: [{ 
			test: /\.jsx?$/, 
			// include: path.resolve(__dirname, '../src'),
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(otf|eot|ttf|svg)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: 'font/[name].[ext]',
					// outputPath: 'style/',
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
		path: path.resolve(__dirname, '../dist')
	}
}

configs.plugins = makePlugins(configs);

module.exports = configs
const MiniCssExtractPlugin=require('mini-css-extract-plugin');//单独打包css
const OptimizeCSSAssetsPlugin=require('optimize-css-assets-webpack-plugin');//压缩css文件
const merge=require('webpack-merge');//webpack配置的合并
const commonConfig=require('./webpack.common.js');

const prodConfig={
	mode:'production',
	//devtool:'cheap-module-source-map',
	module:{
		rules:[{
			//处理scss
			test:/\.scss$/,
			use:[
				 MiniCssExtractPlugin.loader,
				//'style-loader',
				{
					loader:'css-loader',
					options:{
						importLoaders:1
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		},{
			//处理css
			test:/\.css$/,
			use:[
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	//优化
	optimization:{
		//压缩
		minimizer:[new OptimizeCSSAssetsPlugin({})]
	},
	//插件
	plugins:[
		new MiniCssExtractPlugin({
			filename:'[name].css',
			chunkFilename:'[name].chunk.css'
		})
	],
	//输出
	output:{
		filename:'[name].[contenthash].js',//对应entry的name，contenthash为内容的hash值
		chunkFilename:'[name].[contenthash].js'////对应chunk的name，contenthash为内容的hash值
	}
}

module.exports=merge(commonConfig,prodConfig);
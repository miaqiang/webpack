const webpack=require('webpack');
const merge=require('webpack-merge');//webpack 合并
const commonConfig=require('./webpack.common.js');//公共配置

const devConfig={
	//模式
	mode:"development",
	//cheap只定位到行，不定位到列， 需重看
	devtool:'cheap-module-eval-source-map',
	//开发服务
	devServer:{
		contentBase:'./dist',
		open:true,
		port:8083,
		hot:true
	},
	//模块
	module:{
		rules:[{
			//处理scss文件
			test:/\.scss$/,
			use:[
				'style-loader',
				{
					loader:'css-loader',
					options:{
						importLoaders:2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		},{
			//处理css文件
			test:/\.css$/,
			use:[
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	//插件
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	],
	//输出
	output:{
		filename:'[name].js',//对应entry的name
		chunkFilename:'[name].js',//对应chunk的name
	}
}

module.exports=merge(commonConfig,devConfig);
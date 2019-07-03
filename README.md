# webpack
webpac4.35 基本配置



## 实现功能

### 公共实现
1.自动生成html页面    
2.清理生成的dist文件    
3.解析ES6语法    
4.处理图片与字体    
5.代码分离 

#### dev模式实现

<<<<<<< HEAD
1.devServer    
2.处理scss与css文件    
3.热加载      
=======
1.devServer
2.处理scss与css文件
3.热加载   
>>>>>>> 3a08c0a06c805c162bc881d09ccb2ac73f82e00c


### prod模式实现

<<<<<<< HEAD
1.单独打包css文件    
2.压缩css文件   
3.输出文件带contenthash，优化加载        
=======
1.单独打包css文件
2.压缩css文件
3.输出文件带contenthash，优化加载
>>>>>>> 3a08c0a06c805c162bc881d09ccb2ac73f82e00c




## common 代码

### webpack.dev.js
```
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');//html生成插件
const {CleanWebpackPlugin}=require('clean-webpack-plugin');//清理生成文件的插件
const webpack=require('webpack');

module.exports={
	//入口
	entry:{
		index:'./src/index.js',
	},
	//模块
	module:{
		rules:[{
				//处理.js文件
				test:/.js$/,
				include:path.resolve(__dirname,'../src'),
				use:[{
					loader:'babel-loader'
				}]
			},{
				//处理图片
				test:/\.(jpg|png|gif)$/,
				use:{
					loader:'url-loader',
					options:{
						name:'[name]_[hash].[ext]',
						outputPath:'images/',
						limit:10240
					}
				},
			},{
				//处理字体
				test:/\.(eot|ttf|svg)$/,
				use:{
					loader:'file-loader'
				}
			}]
	},
	//插件
	plugins:[
		//生成一个HTML文件
		new HtmlWebpackPlugin({
			//原始模板文件
			template:'src/index.html'
		}),
		//清除上次生成的dist里的内容
		new CleanWebpackPlugin()
	],
	//优化
	optimization:{
		//将包含chunks 映射关系的 list单独从 app.js里提取出
		runtimeChunk:{
			name:'runtime'
		},
		//只打包用到的代码
		usedExports:true,
		splitChunks:{
			chunks:'all',//同步异步都进行代码分离
			cacheGroups:{
				vendors:{
					test:/[\\/]node_modules[\\/]/,
					priority:-10,
					name:'vendors',
				}
			}
		}
	},
	//性能
	performance:false,
	//出口
	output:{
		path:path.resolve(__dirname,'../dist'),
	},
}
/**
 * 备注
 *
 *
 * 1.通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
 */
```




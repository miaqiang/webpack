# webpack
webpac4.35 基本配置



## 实现功能

### 公共实现
1.自动生成html页面    
2.清理生成的dist文件    
3.解析ES6语法    
4.处理图片与字体    
5.代码分离 
6.dll提取
7.多页面配置

react(16.8.8)+redux(7.1)+react-router(5.0.1)配置
接口请求使用axios



### dev模式实现


1.devServer    
2.处理scss与css文件    
3.热加载      


### prod模式实现


1.单独打包css文件    
2.压缩css文件    
3.输出文件带contenthash，优化加载    

```
/**
 * 备注
 *
 *
 * 1.通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
 */
```




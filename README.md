# webpack+react+redux+react-router配置

配置时间：2019.10.15

- webpack4
- react 16.10
- redux 4
- react-router 5
- axios 0.19


### 通用配置
- nodejs版本: v10.15.3+

### 项目开发启动
- 首先通过安装包工具(npm|yarn)安装依赖包
- 只需要在dev环境下进行调试

  > 可以只运行`dev`模式，利用devServer的proxy进行代理,打开devServer里注释的代码，运行即会自动打开页面

- 需要开发和编辑后都能进行访问
  > 需同时运行`dev`和`start`命令，注释掉devServer里的代理方式,在浏览器中访问`http://localhost:8081/dev.html`

- 运行`npm run build:dll`进行dll文件（第三方文件单独提取）打包
- 运行`npm run build`对自己编写的代码进行打包
- 运行`npm run build:all`即对全部文件（第三方文件和自己写的）进行打包



### 文件目录简要说明
- 所有开发源码放在src文件夹下
    - `src/components`下放置react组件
    - `src/assets/style` 下放置css文件
    - `src/assets/images` 下放置图片文件
    - `src/store` 下放置redux文件
    - `src/service` 下放置接口请求文件


## 重要模块
cross-env 跨平台设置环境   
npm-check-updates 升级包   
webpack-merge webpack config 合并

## 实现功能

### 公共实现
#### 1.自动生成html页面

> html-webpack-plugin 
> add-asset-html-webpack-plugin

#### 2.清理生成的dist文件  

> clean-webpack-plugin

#### 3.解析ES6语法  

> babel...

#### 4.处理图片与字体  

> url-loader
> file-loader

#### 5.代码分离 

> import {lazy, Suspense } from 'react'
> 
#### 6.dll提取

#### 7.多页面配置






### dev模式实现


#### 1.devServer

> webpack-dev-server   

#### 2.处理less与css文件 

#### 3.热加载      


### prod模式实现


#### 1.单独打包css文件 

> tyle-loader
> css-loader
> postcss-loader
> less-loader

#### 2.压缩css文件 

 > mini-css-extract-plugin
 > optimize-css-assets-webpack-plugin

#### 3.输出文件带contenthash，优化加载  


```
/**
 * 备注
 *
 *
 * 1.通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。
 */
```




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
            Cookies: "js-cookie"
        }),
    ];
    /*     Object.keys(configs.entry).forEach(item => {
            plugins.push(
                new HtmlWebpackPlugin({
                    template: './template_dll.html',
                    filename: `${item}.html`,
                    chunks: ['runtime', 'vendors', item]
                })
            )
        });
        const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
        files.forEach(file => {
            if (/.*\.dll.js/.test(file)) {
                plugins.push(new AddAssetHtmlWebpackPlugin({
                    filepath: path.resolve(__dirname, '../dll', file)
                }))
            }
            if (/.*\.manifest.json/.test(file)) {
                plugins.push(new webpack.DllReferencePlugin({
                    manifest: path.resolve(__dirname, '../dll', file)
                }))
            }
        });*/
    return plugins;
}


const configs = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        header: "./commonHeaderSource/commonHeader.js"

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
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ]
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
            //include: /src/,
        },
        {
            test: /\.jsx?$/,
            // include: path.resolve(__dirname, '../src'),
            use: [{
                loader: 'babel-loader',
                options: {
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
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    //outputPath: 'images/',
                    limit: 10240
                }
            }
        }, {
            test: /\.(otf|eot|ttf|svg||woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    // outputPath: 'style/',
                    limit: 10240
                }
            }
        }]
    },
    performance: false,
    output: {
        path: path.resolve(__dirname, '../commonHeaderSource'),
        //path: path.join(__dirname, 'commonHeaderSource'),//文件的绝对路径
        publicPath: './commonHeaderSource/',//访问路径
        filename: '[name].js',//输出的文件名
        chunkFilename: "[name].chunk.js?[chunkhash]"
    }
}

configs.plugins = makePlugins(configs);

module.exports = configs
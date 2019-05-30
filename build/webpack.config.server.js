const path = require('path');    //定义绝对路径
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//把非js代码单独打包出来---webpack4
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')//合并不同的webpack配置
const VueServerPlugin = require('vue-server-renderer/server-plugin')//服务端渲染插件--生成一个单独的json文件，用于服务端渲染，处理复杂的逻辑

let config = merge(baseConfig, {
    target: 'node',//打包的目标是node，在node端运行
    entry: path.join(__dirname, '../srcClient/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',//此配置的作用是控制 webpack 打包的内容是如何暴露的
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package').dependencies),//node端不用打包dependencies里面的依赖，直接require就可以
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,

                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }

        ]
    },
    // resolve: {
    //     extensions: ['.js', '.jsx', '.vue', '.json'],//配置此处，在import文件时可以省略后缀名，在匹配上有先后顺序
    // },

    plugins: [
        //把各种东西打包成html的出口文件
        //webpack在编译过程中以及在页面上自己写的js代码判断当前环境可以引用到
        new webpack.DefinePlugin({       //vue react时必须用的
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'), //此处不处理一下development会报错
                VUE_ENV: '"server"',
            }
        }),
        new VueServerPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contentHash:8].css'
        })
    ]
})

module.exports = config;
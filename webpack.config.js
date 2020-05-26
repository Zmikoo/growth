
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');// 用于清除dist中没用的文件
module.exports = {
    mode: 'production',//会将 process.env.NODE_ENV 的值设为 production.只设置 NODE_ENV，则不会自动设置 mode
    entry: ['babel-polyfill','./src/index.js'],//
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'growth.js'
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/, 
            //     use: ['style-loader','css-loader']
            // },
            // {
            //     test: /\.(jpg|png|gif|svg$)/, 
            //     use: ['file-loader']
            // },
            {
                test:/\.(jpg|png|gif|svg$)/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 1,
                    name: 'imgs/[name].[hash].[ext]',
                    publicPath: './'
                }
            },
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
                        
            //         }
            //     }
            // },
            // {
            //     test: /\.(htm|html)$/i,
            //     use: ['html-withimg-loader']// 打包html中的img
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     minify: false
        // })
    ]
}
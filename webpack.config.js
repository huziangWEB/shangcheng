const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebapckPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const getHtmlConfig = function(name){
	return  {
				template: './src/view/' + name + '.html',
				filename: 'view/' + name + '.html',
				inject: true,
				hash: true,
				chunks: ['base', 'common', name]
			}
};


module.exports = {
	entry: {
		common: './src/page/commons/index.js',
		index: './src/page/index/index.js',
		login: './src/page/login/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			util: __dirname + '/src/util',
			node_modules: __dirname + '/node_modules',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image'
		}
	},
	mode: "production",
	plugins: [
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
		new CleanWebapckPlugin(['dist']),
		new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      filename: "[name].css",
	      chunkFilename: "css/[name].css"


	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      // filename: devMode ? '[name].css' : '[name].[hash].css',
	      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
	    })
	],
	// optimization: {
 //        splitChunks: {
	//         cacheGroups: {
	//             commons: {  // 抽离自己写的公共代码
	//                 chunks: "initial",
	//                 name: "base", // 打包后的文件名，任意命名
	//                 minChunks: 2,//最小引用2次
	//                 minSize: 0 // 只要超出0字节就生成一个新包
	//             },
	//             vendor: {   // 抽离第三方插件
	//                 test: /node_modules/,   // 指定是node_modules下的第三方包
	//                 chunks: 'initial',
	//                 name: 'vendor',  // 打包后的文件名，任意命名
	//                 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
	//                 priority: 10
	//             }
	//         }
	//     }
 //    },
	 optimization: {
	      splitChunks: {
	          chunks: 'all', // 只对入口文件处理
	          cacheGroups: {
	              vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
	                  test: /node_modules\//,
	                  name: 'vendor',
	                  priority: 10,
	                  enforce: true
	              },
	              common: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
	                  
	                  name: 'base',
	                  priority: 10,
	                  enforce: true
	              }
	          }
	      }
	  //     runtimeChunk: {
	  //         name: 'manifest'
	  //     }
	  },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              // you can specify a publicPath here
		              // by default it use publicPath in webpackOptions.output
		              publicPath: '../'
		            }
		          },
		          "css-loader"
		        ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(csv|tsv)/,
				use: [
					'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			},{
				test: /\.string$/,
				use: [
					'html-loader'
				]
			}
		]
	}
};
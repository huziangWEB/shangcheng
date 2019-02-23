const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebapckPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const getHtmlConfig = function(name, title){
	return  {
				template: './src/view/' + name + '.html',
				filename: 'view/' + name + '.html',
				favicon : './favicon.ico',
				title: title,
				inject: true,
				hash: true,
				chunks: ['commons', name]
			}
};


module.exports = {
	entry: {
		'commons': './src/page/commons/index.js',
		'index': './src/page/index/index.js',
		'user-login': './src/page/user-login/index.js',
		'user-register': './src/page/user-register/index.js',
		'user-pass-reset': './src/page/user-pass-reset/index.js',
		'result': './src/page/result/index.js',
		'user-center': './src/page/user-center/index.js',
		'user-center-update': './src/page/user-center-update/index.js',
		'user-pass-update': './src/page/user-pass-update/index.js',
		'list': './src/page/list/index.js',
		'detail': './src/page/detail/index.js',
		'cart': './src/page/cart/index.js',
		'order-confirm': './src/page/order-confirm/index.js',
		'order-list': './src/page/order-list/index.js',
		'order-detail': './src/page/order-detail/index.js',
		'payment': './src/page/payment/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
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
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('result','结果')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center','个人信息')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('list','列表')),
		new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
		new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
		new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
		new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
		new CleanWebapckPlugin(['dist']),
		new MiniCssExtractPlugin({
	      filename: "[name].css",
	      chunkFilename: "css/[name].css"
	    })
	],
	optimization: {
		splitChunks: {
		    chunks: "async",
		    minSize: 30000,
		    minChunks: 1,
		    maxAsyncRequests: 5,
		    maxInitialRequests: 3,
		    name: true,
		    cacheGroups: {
		        default: {
		            minChunks: 2,
		            priority: -20,
		            reuseExistingChunk: true
		        },
		        vendors: {
		            test: /[\\/]node_modules[\\/]/,
		            priority: -10
		        }
		    }
		}
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
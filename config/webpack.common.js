


let router = require('../router');
const { returnPath, returnPublicPath } = require('./index');
const webpack = require('webpack');
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取公共的css


module.exports = (env) => {
	// 这里的env参数 是写在运行命令的
	const NODE_ENV = env.NODE_ENV;

	router = router(NODE_ENV);

	return {
		entry: router.entry,
		output: {
			path: path.resolve(__dirname, '..', 'dist'), // 输出的到文件夹下
			filename: returnPath('js', 'js'), // 文件的路径
			chunkFilename: returnPath('js', 'js'), 
			publicPath () {
				// console.log(this);
				return returnPublicPath(NODE_ENV, 'publicPath');
			}
		},
		// 文件处理的loader 都是重后到前执行的
		module: {
			rules: [
				{
					test: /\.(css|scss)$/,
					// exclude: /(node_modules|bower_components)/,
					use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: returnPublicPath(NODE_ENV, 'staticPublicPath')
						}
					}, {
						loader: 'css-loader',
						options: {
							publicPath: returnPublicPath(NODE_ENV, 'staticPublicPath')
						}
					}, {
						loader: 'postcss-loader',
						options: {}
					}, {
						loader: 'sass-loader',
						options: {
							publicPath: returnPublicPath(NODE_ENV, 'staticPublicPath')
						}
					}]
				}, {
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader'
					}]
				}, {
					test: /\.(ts|tsx)$/,
					exclude: /(node_modules|bower_components)/,
					use: 'ts-loader',
					exclude: /node_modules/
				}, {
					test: /\.html$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'html-loader',
						options: {
							attrs: ['img:src', ':style']
						}
					}]
				}, {
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'url-loader', 
						options: {
							limit: 10000, //10000: 表示低于10000字节（10K）的图片会以 base64编码
							name: returnPath('img')
						}
					}, {
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}]
				}, {
					test: /\.(ico)$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'file-loader',
						options: {
							name: returnPath('img')
						}
					}]
				}, {
					test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: returnPath('media')
						}
					}]
				}, {
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: returnPath('fonts')
						}
					}]
				}
			]
		},
		plugins: [
			...router.template,
			// 提取公共的css
			new MiniCssExtractPlugin({
				// filename: 'static/css/[name].css',
				// chunkFilename: 'static/css/' + router.common + '.css'
				filename: returnPath('css'),
				chunkFilename: returnPath('css', router.common)
			}),
			// 默认加载的js
			new webpack.ProvidePlugin({
				'Promise': 'bluebird',
				// 'axios': 'axios',
				'common': path.resolve(__dirname, '..', 'src/assets/js/module/common.jsx'),
				'ajax': path.resolve(__dirname, '..', 'src/assets/js/module/ajax.js'),
				// 'React': 'react',
				// 'ReactDom': 'react-dom',
			})
		],
		// 提取公共的js
		optimization: {
			splitChunks: {
				// chunks: "initial",
				minSize: 0, // 模块的最小体积
				// minChunks: 1, // 模块的最小被引用次数
				maxAsyncRequests: 5, // 按需加载的最大并行请求数
				maxInitialRequests: 5, // 一个入口最大并行请求数
				cacheGroups: { // 缓存组
					// vendors: { // 抽离第三方插件
					// 	test: /node_modules/,
					// 	name: 'vendors',
					// 	chunks: 'initial',
					// 	priority: 10
					// },
					commons: { // 抽离自己写的公共代码，common这个名字可以随意起
						name: router.common,
						chunks: 'initial',
						minChunks: router.template.length
					}
				}
			},
			minimize: true
		},
		resolve: {
			// 没有后缀命的会自动匹配下面的参数
			extensions: ['.js', '.json', '.ts', '.tsx'],
			// 快捷路径
			alias: {
				// '@view': path.resolve(__dirname, '..','src/view'),
				'@ts': path.resolve(__dirname, '..', 'src/assets/js'),
				'@img': path.resolve(__dirname, '..', 'src/assets/img'),
				'@css': path.resolve(__dirname, '..','src/assets/css'),
			}
		},
	};
};
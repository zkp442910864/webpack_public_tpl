/* module.exports = {
	plugins: [
		require('autoprefixer')({ browsers: ['last 5 versions', 'iOS >= 7', 'Android >= 4'] })
	]
}; */
module.exports = ({ file, options, env }) => ({
	// parser: 'sugarss',
	plugins: [
		require('autoprefixer')({ browsers: ['cover 99.5% in CN'] }),
		require('cssnano')
	]
});

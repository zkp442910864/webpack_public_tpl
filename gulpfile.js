const gulp = require('gulp');
const rename = require('gulp-rename'); // 重命名
const path = require('path');
const header = require('gulp-header'); // 向文件里插入第一行
const {filesPath} = require('./config');
const routes = require('./router/routes.js');

// defaultSuffix: ['ejs', 'scss', 'js']
const initFile = filesPath.defaultSuffix.map((suffix) => {
	return `index.${suffix}`;
});

function returnHeader (file, url) {
	// 给不同的文件添加第一行
	url = url.indexOf('/') === 0 ? url.substr(1) : url;
	switch (file) {
		case initFile[0]:
			return `<!-- ${url} -->`;
		case initFile[1]:
			return `// ${url}`;
		case initFile[2]:
			return `import '@css/${url}.scss';`;
	}
}

function test (url) {
	const index = url.lastIndexOf('/');
	let [q, h] = ['', ''];
	if (index > -1) {
		q = url.substr(0, index);
		h = url.substr(index + 1);
	} else {
		q = '';
		h = url;
	}

	// 要创建的文件
	const arr = [
		{
			file: initFile[0],
			url: filesPath.viewUrl
		}, {
			file: initFile[1],
			url: `${filesPath.sourcesUrl}/${filesPath.default[0]}`
		}, {
			file: initFile[2],
			url: `${filesPath.sourcesUrl}/${filesPath.default[1]}`
		}
	];

	arr.forEach((item) => {
		gulp.src([
			path.resolve(__dirname, filesPath.initUrl, item.file),
		]).pipe(rename((path) => {
			path.basename = h;
			return path;
		})).pipe(header(returnHeader(item.file, `${q}/${h}`))).pipe(gulp.dest([
			path.resolve(__dirname, item.url, q),
		]));
	});
}

gulp.task('run2', (cb) => {
	routes.forEach(item => {
		// 这里的操作应该都属于异步的（现在写成同步的，虽然还没报出问题来。目前只能先这样写）
		try {
			// 判断是否有这文件
			require(path.resolve(__dirname, 'src/view/', `${item.entryKey}.ejs`));
		} catch (error) {
			// 没有的话执行
			if (error.code === 'MODULE_NOT_FOUND') {
				// 找不到文件会执行这个
				test(item.entryKey);
			}
		}
	});
	
	return gulp.src('./', { read : false});
});

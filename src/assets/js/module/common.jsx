
import 'normalize.css';
import '@css/common.css';
import '@babel/polyfill';
// import favicon from '@img/favicon.ico';
// console.log(ajax);

export const init = () => {
	// const link = document.getElementById('link-icon');
	// link.href = favicon;
};

export class Loding {
	constructor () {
		this.win = null;
	}

	open () {
		const div = document.createElement('div');
		div.className = 'mask';
		div.innerHTML = '<div class="load"></div>';

		this.win = div;
		document.body.appendChild(this.win);
	}

	close () {
		if (this.win) {
			document.body.removeChild(this.win);
			this.win = null;
		}
	}
}

export const reactJs = async () => {
    let [React, ReactDom] = [null, null];
    const load = new Loding();
    load.open();
    await import(/* webpackChunkName: "react", webpackPreload: true */'react').then(_React => {
        React = _React;
    });
    await import(/* webpackChunkName: "react", webpackPreload: true */'react-dom').then(_ReactDom => {
        ReactDom = _ReactDom
    });
    load.close();

    return Promise.resolve({React, ReactDom});
}

export const getQuery = () => {
	//取得查询字符串并去掉开头的问号
	const str = location.search;
	const qs = str.length > 0 ? str.substr(1) : '';

	//没有值就可以直接跳出了，但是为了不报错，就返回个空对象
	if (!qs.length) {
		return {};
	}

	//保存数据的对象
	const args = {};

	//取得每一项
	const items = qs.split('&');

	//逐个将每一项添加到 args 对象中
	for (let i in items) {
		const item = items[i].split('=');
		const name = item[0];
		(name && name.length) && (args[name] = item[1]);
	}

	return args;
}

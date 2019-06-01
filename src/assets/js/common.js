
import '@css/common.css';
import '@babel/polyfill';
import favicon from '@img/favicon.ico';

export const init = () => {
	const link = document.getElementById('link-icon');
	link.href = favicon;
};


export const isWx = () => {
	const ua = window.navigator.userAgent.toLowerCase();
	//判断是不是微信
	return ua.match(/MicroMessenger/i) == 'micromessenger';
};

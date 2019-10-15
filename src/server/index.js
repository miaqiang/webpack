
import axios from 'axios';

export function doAxios({ url, data = {}, type = 'GET', responseType, ContentType = 'application/json;charset=utf-8' }) {

	let options = {
		credentials: 'include',
		headers: {
			'accept': 'application/json',
			'Content-Type': ContentType,
			'Cache-Control': 'no-store'
		}
	};

	if (type.toLocaleUpperCase() === 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		});

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = encodeURI(url + '?' + dataStr);
		}
	} else {
		options.body = JSON.stringify(data);
	}

	return axios(url, options).then((response) => {

		console.log('responsesssss', response);


		return response.data;
		// Cookies.set('last_request_time',Date.now());
		return responseType == 'text' ? response.text() : response.json();
	});
}



export function isLogin(response) {
	if (response.code == 401) {
		console.log('未登录')
	}
	return response;
}





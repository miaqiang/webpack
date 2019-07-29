import 'whatwg-fetch';
import Cookies from 'js-cookie';

export function doFetch({url,data={},type='GET',responseType,ContentType='application/json;charset=utf-8'}){
	let options = {
		  credentials: 'include',
		  headers: {
		    'accept': 'application/json',
		    'Content-Type':ContentType,
		    'Cache-Control':'no-store'
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
	}else{
		options.body = JSON.stringify(data);
	}
	if (url.indexOf("?") >= 0) {//判断url中是否已经带有参数
		 // url = url + "&t=" + (new Date()).valueOf();
	} else {
		 // url = url + "?t=" + (new Date()).valueOf();
	}
	options.method = type;

	return fetch(url,options).then((response)=>{
		Cookies.set('last_request_time',Date.now());
		return responseType=='text' ? response.text() : response.json();
	});
}




export function isLogin(response){
	console.log('hello world')
	if(response.code == 401){
		location.href = 'index.html';
	}
	return response;
}

export const fetchChongqingMap = (data) =>doFetch({url:`./src/javascript/plugin/chongqing.json`,type:'GET'}).then(isLogin);

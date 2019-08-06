
import axios from 'axios';
const PATH='/sjzx';

function doAxios({url,data={},type='GET',responseType,ContentType='application/json;charset=utf-8'}){

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

	return axios(url,options).then((response)=>{

		console.log('responsesssss',response);


		return response.data;
		// Cookies.set('last_request_time',Date.now());
		return responseType=='text' ? response.text() : response.json();
	});
}

export function isLogin(response){
	if(response.code == 401){
		console.log('未登录')	
	}
	return response;
}


//1. 获取当前用户
export const axiosCurrentuser = (data) =>doAxios({url:PATH+`/api/v1/currentuser`,type:'GET'}).then(isLogin);

//2. 获取所有应用得入口地址
export const axiosAppentry = (data) =>doAxios({url:PATH+`/api/v1/appentry`,type:'GET'}).then(isLogin);


//3. 退出登陆
export const axiosLogout = (data) =>doAxios({url:PATH+`/api/v1/logout`,type:'GET'}).then(isLogin);

//4.获取bi配置
export const axiosBi = (data) =>doAxios({url:PATH+`/api/v1/bi`,type:'GET'}).then(isLogin);


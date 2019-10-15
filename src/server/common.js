
import { doAxios, isLogin } from "./index.js";

let PATH = "leapid-admin";
console.log('doAxios', doAxios);


export const getCurrentuser = () => doAxios({ url: PATH + '/api/v1/currentuser', type: 'GET' }).then(isLogin);
//1. 获取当前用户
export const axiosCurrentuser = (data) => doAxios({ url: PATH + `/api/v1/currentuser`, type: 'GET' }).then(isLogin);

//2. 获取所有应用得入口地址
export const axiosAppentry = (data) => doAxios({ url: PATH + `/api/v1/appentry`, type: 'GET' }).then(isLogin);


//3. 退出登陆
export const axiosLogout = (data) => doAxios({ url: PATH + `/api/v1/logout`, type: 'GET' }).then(isLogin);

//4.获取bi配置
export const axiosBi = (data) => doAxios({ url: PATH + `/api/v1/bi`, type: 'GET' }).then(isLogin); 
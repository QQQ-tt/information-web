import axios from "axios";
import {useUserTokenStore} from "@/stores"
import router from "@/router/router"


const warningMsg = (msg) => {
    ElMessage({
        message: msg,
        type: 'warning',
    })
}
const successMsg = (msg) => {
    ElMessage({
        message: msg,
        type: 'success',
    })
}
const errorMsg = (msg) => {
    ElMessage.error(msg)
}


const baseURL = 'http://' + __BACKEND_URL__;

// 创建实例时配置默认值
const instance = axios.create();

instance.defaults.timeout = 1000;
instance.defaults.baseURL = baseURL;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserTokenStore();
    if (userStore.info.token) {
        config.headers.Authorization = `Bearer ${userStore.info.token}`;
        config.headers.set('user', userStore.info.userId);
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 200) {
        successMsg(response.data.msg);
    }
    if (response.data.code != null && response.data.code !== 200) {
        warningMsg(response.data.msg || "服务器异常");
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {
        router.push({name: "login"}).then(r => {
            warningMsg("请先登录");
        });
        return;
    }
    if (error.response.status === 500) {
        errorMsg(error.response.data.msg || "请求异常")
    }
    return Promise.reject(error);
});

export default instance
export {baseURL}
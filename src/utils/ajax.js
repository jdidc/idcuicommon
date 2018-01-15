import axios from 'axios';
import { Message } from 'iview';

let ajax = axios.create({
    timeout: 30000
});

// 请求完成后拦截
ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 统一捕获错误
        if (error.response.status == 401) {
            Message.error({
                content: error.response.data.message,
                duration: 3
            });
        }

        // return Promise.reject(error);
        return Promise.resolve(error.response);
    }
);

export default ajax;

import { AxiosResponse } from 'axios';
import { AxiosInterceptor } from './types';
import { BetaBaseResponse } from '../response';

export const ErrorResponseInterceptor: AxiosInterceptor<AxiosResponse<BetaBaseResponse<any>>> = [
    // @ts-ignore
    res => {
        if (!res.data?.success) {
            if (process.env.NODE_ENV === "development") {
                console.warn(`___________request error_______________`);
                console.warn(`${res.config.url} request error ${res.data.msg}`);
                console.warn(`___________request error_______________`);
            }
            console.log(res?.data?.msg ?? '服务异常,请稍后重试!');
            
            return Promise.reject(res.data.msg);
        }
        return res;
    },
    err => {
        if (err?.message && err.message === 'Network Error') {
            console.log('网络异常')
        }
        return Promise.reject(err);
    }
];

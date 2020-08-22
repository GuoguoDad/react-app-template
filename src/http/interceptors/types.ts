import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NavigationParams } from 'react-navigation';

export type AxiosInterceptor<V> = [OnFulfilled<V>, OnRejected];
export type AxiosRequsetInterceptor = [RequestOnFulfilled, OnRejected];

export type OnFulfilled<V> = (value: V) => AxiosResponse<V> | Promise<AxiosResponse<V>>;
export type OnRejected = (error: any) => any;

export type RequestOnFulfilled = (
    value: AxiosRequestConfig
) => Promise<AxiosRequestConfig> | AxiosRequestConfig;

export type RouteTree = {
    name: string;
    subPath?: RouteTree | null;
    param?: NavigationParams;
};

import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Response } from './types';

/**
 * 百度联想搜索词
 *
 * @param value
 */
export function baiduSuggestion(value: string) {
  console.log(value);
  return request({
    url: '/api/su?cb=queryList&wd=' + value,
    method: 'get',
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: any) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  });
}
/**
 * 用户登录
 *
 * @param data
 */
export function userLogin(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  });
}

/**
 * 用户登录
 *
 * @param data
 */
export function userLogout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
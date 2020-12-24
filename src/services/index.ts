import request from '@/utils/request'
import { LoginRequestParams } from './interface'

export async function getCaptchaUrl() {
  return request(`/plat/captcha`, {
    method: 'GET'
  })
}

export async function appLogin(params: LoginRequestParams) {
  return request('/plat/login', {
    method: 'POST',
    data: params
  })
}

export async function appLogout() {
  return request('/plat/loginOut', {
    method: 'GET'
  })
}
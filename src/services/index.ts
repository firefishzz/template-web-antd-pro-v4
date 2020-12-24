import request from '@/utils/request'
import {
  LoginRequestParams,
  VerificationRequestParams,
  ResetPasswordRequestParams
} from './interface'

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

export async function appResetPassword(params: ResetPasswordRequestParams) {
  return request('/plat/reset', {
    method: 'POST',
    data: params
  })
}

export async function appLogout() {
  return request('/plat/loginOut', {
    method: 'GET'
  })
}

export async function verificationQuery(params: VerificationRequestParams) {
  return request('/plat/query', {
    method: 'GET',
    data: params
  })
}

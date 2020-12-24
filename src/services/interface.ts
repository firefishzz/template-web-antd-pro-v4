export interface LoginRequestParams {
  userName: string
  password: string
  captcha: string
  token: string
}

export interface VerificationRequestParams {
  code: string
}

export interface ResetPasswordRequestParams {
  userName: string
  oldPwd: string
  newPwd: string
}

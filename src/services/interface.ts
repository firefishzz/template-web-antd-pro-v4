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
export interface VerifiCompleteReq {
  code: string
  itemNo: string
}

export interface QueryMerchantReq {
  itemNo: string
}

export interface AddCouponReq {
  itemNo: string
  num: number
  startTime?: string
  endTime?: string
  expired?: number
}

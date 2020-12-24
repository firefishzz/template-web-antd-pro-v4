import { parse } from 'querystring'
import { JSEncrypt } from 'jsencrypt'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true
  }
  return window.location.hostname === 'preview.pro.ant.design'
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env
  if (NODE_ENV === 'development') {
    return true
  }
  return isAntDesignPro()
}

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const encryptPassword = (plainText: any, cb?: Function) => {
  const publicKeyMaps = {
    test: `
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuNJmyidQ631bVWGh6JFm
    iRzDdOIzpb1VEnS4bh/sNiAJT292OdRPujqFSzpCUM00Jx3m59/ALB4Psn7lBzeO
    9M81+Cd5mOQKYayIbEZTAIGHY1ic39sVtcK/VRd8X6WymWU5GwaBU/soWRswn1/n
    nY2jSONgp0wZ6ekyTxn7uG963MBs0qqGe+SQgH+yDZyW0DOkhDzew+9J/XWELP4E
    3SjU/oaj0MPbGEBW50D1RqM9nmfGmw7ztm0qKuzKXfRqhjKCLUPT08WgCgdg/bo0
    Vsdg1M787VWQjEBXo82LVAXUUSVwJo96AeFiAy6TA27V4hWfeFOSSNLE408nruIP
    ywIDAQAB
    -----END PUBLIC KEY-----
    `,
    prod: `
    -----BEGIN RSA PUBLIC KEY -----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2/NOWTenTIgEhC+3kqZx
    Xuo9xMPcPZfO4vLLQ40kph/dlK10BSaGELegfnQwsuc/28hKVwH8xVGrHP6+VVZd
    r7WvpTYe49zr1TGnqZXsbpZL1Kfo8/5OwnVLoWZr1b66CmjliS+14n3Qd+T03hxw
    fd3QYsRy0TnC5161DITZqJQIq133coh7h+Nls8rLwwgXFBCr8ZOzjC0b9fBU+roh
    uOHryghaBJLtHiQWFXzyHu/lUldPEBiO0vBO2CmJfogBHI0WKyI9m82ZqsIm0ICI
    yexiInZqGVVO8RyMFxEahhYurczKFCHrvIj0pkvnAEZl4ZuGU8uuCdr9DSQQ6tuZ
    uwIDAQAB
    -----END RSA PUBLIC KEY -----
    `
  }
  const mapkey = REACT_APP_CIL_ENV === 'local' ? 'test' : REACT_APP_CIL_ENV
  const key = publicKeyMaps[mapkey]
  const rsa = new JSEncrypt()
  rsa.setPublicKey(key)
  const encryptPlainText = rsa.encrypt(plainText)
  if (!encryptPlainText) {
    if (cb) {
      cb()
    }
    return plainText
  }
  return encryptPlainText // 加密有可能因为二次加密而失败，则把原字符串返回
}

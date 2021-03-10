import { parse } from 'querystring'
import { JSEncrypt } from 'jsencrypt'
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => urlReg.test(path)

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const frontRsaEncrypt = (plainText: any, cb?: Function) => {
  const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAshn8Ic6LUfdk89vlfO6p
  YtQXkWszo7tGQJJ9+9mxgfiZ4C0c8olPXEDaB0YLxmylHavjZchnruzJR7giD+34
  0Npcmo2Y9xyOuGbU3g8uCYSsea/wdlO5zMoL24j9yTnN3qQIP4Js2QaEELzthwFg
  aFVAYv0kFiuibQOqzEZxDRissj58+YCXMO4nvgG716tryDL57ie6DxuqFj6HKovk
  Ao4q+x5aRG4vTjgWjDcQWq3GoY+Khmh2K2oHRh3ty4aixUeVMLt4P+Luw/NX7XrE
  M6bzDdnH6oU7Sz2nz6MuI0qlmPxC4HtUGD+1RS6KDwIxi0hWWxU3/UMVzktL6aQh
  bwIDAQAB
  -----END PUBLIC KEY-----
  `
  const rsa = new JSEncrypt()
  rsa.setPublicKey(publicKey)

  const encryptPlainText = rsa.encrypt(plainText)
  if (!encryptPlainText) {
    if (cb) {
      cb()
    }
    return plainText
  }

  return encryptPlainText // 加密有可能因为二次加密而失败，则把原字符串返回
}

export const frontRsaDecrypt = (encryptPlain: any, cb?: Function) => {
  const privateKey = `
  -----BEGIN PRIVATE KEY-----
  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyGfwhzotR92Tz
  2+V87qli1BeRazOju0ZAkn372bGB+JngLRzyiU9cQNoHRgvGbKUdq+NlyGeu7MlH
  uCIP7fjQ2lyajZj3HI64ZtTeDy4JhKx5r/B2U7nMygvbiP3JOc3epAg/gmzZBoQQ
  vO2HAWBoVUBi/SQWK6JtA6rMRnENGKyyPnz5gJcw7ie+AbvXq2vIMvnuJ7oPG6oW
  Pocqi+QCjir7HlpEbi9OOBaMNxBarcahj4qGaHYragdGHe3LhqLFR5Uwu3g/4u7D
  81ftesQzpvMN2cfqhTtLPafPoy4jSqWY/ELge1QYP7VFLooPAjGLSFZbFTf9QxXO
  S0vppCFvAgMBAAECggEBAJJ+USc1jt8i0MTMsNysKmOB9MjGFrmsRsLCPCI2E43G
  gDsmoFLWopJNPYkSEolpv/7B7c9Aohf96Cm3yTy1Dx4rHlR598H6mWIQIzNr5QAr
  Qvrsvqt1frR11H8FFUq44x8oaShkDUgN1f82h2Guvi/TP5ysf0xFI9rrU0enAUI1
  EudoKrVFG17FmvQvDl096ZT94MJlBoZdDD6lkLMvJX23IENF6M2/TRFyYd793mAR
  RXn6QPFSL/6p+aVFhNFrGMkoJLPgpud1vNd3oVFThj7wQYmZTobH+rAu0CJRTokh
  e3KvAwIu/tVxGHdbHx1HNM/noZE0G1P7cP9dpjtiDjECgYEA6SGxorNOYvdBwJq1
  o8DVkf7YfEZDfGTsaS1vAqic6VTQR0+Nq0cV0Tq5CnEn06IkZhAWIy1fiLny0Ucv
  JNABHK8UydtNt0+WlQu/kXVhqDS7qTOMH4ID4xKUnmz/yHPexuN2UqiXOejK1gYq
  2yk/XNCTxYRq1JAZNaDAgnwxHp0CgYEAw5JlsRfuodBfsr46k8B/QN+quMUqXEBU
  y9t57yDzM98jVAeg7L9SmStUVBWqd1ylH4KrCTSayEOSR18MESm4Z1cmozHrMLOG
  4qMfuKKu5SR9qP671Y+17Zr3lXAK6XpFOEPbt2VA5w40ThOLPwJNEvvIm+2iIdBP
  SKIbszASXHsCgYAG/0LknjsZD1DC5iHTg2MlmZ+Hw1gdMK5DzeBKFSN4gVoq+cFH
  xb9q4zdQj+rhGDm9cngnoCIA6YvXKirJEREnej3GfTWM7e+YE50xUXOX59VGE8z9
  2Roiw5kAVEctDgU+tO8FNhgr3cfQuqiooUlMkNoOkJXgQV7wVB3TDMUwpQKBgHyy
  zMplQw/D6DD1IC5zb/AybQ2REdhuYGL3V0EE1m09mq4Kiy5JM2ZcfVF72wxucw6r
  Z1jgRMzqYMvHK8+JtX2W0Rj/TEHqRlgdwK0edbu/T6xAeA3MqyiMRc7v+NUz1Azz
  H5ZJJl/s66bYyVFsqy4ugpQBqf47b0IVsunG/f4fAoGAKUMaZh37anVxY+nLcA+C
  uJ5ICs9zqASdSBjRkeA5iheUk1LwJZb+1Dw5EcPeoMm3Pw0V+N2SXDb0ER7DaPZ0
  6RU0tVQEe62ZQ4jpZ7eNqjHuOrnwPGJVIimdWcmuZ0Zhbj881xIgSzXq4jPnTYHK
  0SjfoYPtKLv3s9Ti2wVkQRQ=
  -----END PRIVATE KEY-----
  `
  const rsa = new JSEncrypt()
  rsa.setPrivateKey(privateKey)

  console.log('encryptPlain', encryptPlain)

  const encryptPlainRes = rsa.decrypt(encryptPlain)
  console.log('encryptPlainRes', encryptPlainRes)

  if (!encryptPlainRes) {
    if (cb) {
      cb()
    }
    return encryptPlain
  }
  return encryptPlainRes
}

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

export const openDownloadDialog = (url: any, saveName?: string) => {
  const isBlob = typeof url === 'object' && url instanceof Blob
  //  支持IE和edge浏览器且为文件流下载
  if (window.navigator.msSaveBlob && isBlob) {
    window.navigator.msSaveBlob(url, saveName)
    return
  }

  if (isBlob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = url
  saveName && (aLink.download = saveName)

  console.log('saveName', saveName, aLink)

  aLink.click()
  aLink.remove()
}

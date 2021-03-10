import { history, Effect, Reducer } from 'umi'
import { stringify } from 'querystring'

import { appLogin, appLogout } from '@/services/index'
import { setAuthority } from '@/utils/authority'
import { getPageQuery, frontRsaDecrypt, frontRsaEncrypt } from '@/utils/utils'
import { message } from 'antd'

export interface CurrentUser {
  userName?: string
  role?: 'in' | 'out'
}

export interface UserModelState {
  currentUser?: CurrentUser
}

export interface UserModelType {
  namespace: 'user'
  state: UserModelState
  effects: {
    login: Effect
    logout: Effect
  }
  reducers: {
    saveCurrentUser: Reducer<UserModelState>
    changeNotifyCount: Reducer<UserModelState>
  }
}

let initCurrentUser = {}
try {
  if (localStorage.getItem('userInfo')) {
    const decryptUser = JSON.parse(frontRsaDecrypt(localStorage.getItem('userInfo')) || '{}')
    const isDecryptSuccess = typeof decryptUser === 'object' && !!decryptUser.userName
    if (isDecryptSuccess) {
      initCurrentUser = decryptUser
    } else {
      localStorage.removeItem('userInfo')
    }
  }
} catch {
  initCurrentUser = {}
  localStorage.removeItem('userInfo')
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: initCurrentUser
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(appLogin, payload)

      const { code, msg, ...restRes } = response
      if (code) {
        const codeMaps = {
          '17': '图形码有误，请确认',
          '18': '用户名或者密码不正确'
        }
        message.error(codeMaps[code] || msg || '未知错误')
        return response
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: restRes
        })
        
        message.success('登录成功！')
        
        // const urlParams = new URL(window.location.href)
        // const params = getPageQuery()
        // let { redirect } = params as { redirect: string }

        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect)
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length)
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1)
        //     }
        //   } else {
        //     window.location.href = '/'
        //     return
        //   }
        // }
        history.replace('/')
      }
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(appLogout)
      const { code, msg } = response
      if (code !== '16') {
        message.error(msg)
      }
    }
  },

  reducers: {
    saveCurrentUser(state, action) {
      localStorage.setItem('userInfo', frontRsaEncrypt(JSON.stringify(action.payload)))
      setAuthority(action.payload.role)
      return {
        ...state,
        currentUser: action.payload || {}
      }
    },
    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      }
    }
  }
}

export default UserModel

import { Input, Form, Button } from 'antd'
import React, { useState, useRef } from 'react'
import { connect, Dispatch, history } from 'umi'

import { ConnectState } from '@/models/connect'
import { LoginRequestParams } from '@/services/interface'
import { encryptPassword } from '@/utils/utils'
import { CaptchaInput } from '@/components/Input/index'
import styles from './index.less'

interface LoginProps {
  dispatch: Dispatch
  submitting?: boolean
}

const Login: React.FC<LoginProps> = (props) => {
  const { submitting } = props

  const [captchaToken, handleCaptchaToken] = useState<string>('')
  const captchaRef: any = useRef({})

  const onFinish = (values: LoginRequestParams) => {
    const param = {
      token: captchaToken,
      password: encryptPassword(values.password),
      userName: values.userName,
      captcha: values.captcha
    }
    const { dispatch } = props
    dispatch({
      type: 'user/login',
      payload: param
    }).then((res: any) => {
      if (res && res.code) {
        captchaRef.current.refreshCaptcha()
      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const getCurrentCaptcha = (value: any) => {
    handleCaptchaToken(value.token)
  }

  const toResetPassword = () => {
    history.push('/user/resetPassword')
  }
  return (
    <div className={styles.main}>
      <div className={styles.topWrap}>
        <span>登录</span>
      </div>

      <div className={styles.loginForm}>
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input maxLength={10} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              {
                max: 8,
                min: 8,
                type: 'string',
                message: '请输入8位密码'
              }
            ]}
          >
            <Input.Password maxLength={8} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
            <CaptchaInput
              innerRef={captchaRef}
              getCurrentValue={getCurrentCaptcha}
              placeholder="请输入验证码"
            />
          </Form.Item>

          <div className={styles.extraWrap}>
            <span onClick={toResetPassword}>重置密码</span>
          </div>

          <Form.Item>
            <Button
              loading={submitting}
              size="large"
              block={true}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['user/login']
}))(Login)

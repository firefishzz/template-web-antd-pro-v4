import { Input, Form, Button } from 'antd'
import React, { useState } from 'react'
import { connect, Dispatch, useIntl } from 'umi'
import { StateType } from '@/models/login'
import { LoginParamsType } from '@/services/login'
import { ConnectState } from '@/models/connect'
import { CaptchaInput } from '@/components/Input/index'

import styles from './index.less'

interface LoginProps {
  dispatch: Dispatch
  userLogin: StateType
  submitting?: boolean
}

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props
  const { status } = userLogin

  const intl = useIntl()

  const onFinish = (values: LoginParamsType) => {
    console.log('Success:', values, status)
    const { dispatch } = props
    dispatch({
      type: 'login/login',
      payload: { ...values }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.main}>
      <div className={styles.topWrap}>
        <span>登录</span>
      </div>

      <div className={styles.loginForm}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: admin or user'
              })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design'
              })}
            />
          </Form.Item>

          <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
            <CaptchaInput placeholder="请输入验证码" />
          </Form.Item>

          <div className={styles.extraWrap}>
            <span>重置密码</span>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login']
}))(Login)

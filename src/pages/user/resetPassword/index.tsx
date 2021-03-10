import { Input, Form, Button } from 'antd'
import React, { useState, useRef } from 'react'
import { history, connect, Dispatch, useIntl } from 'umi'
import { message } from 'antd'

import { encryptPassword } from '@/utils/utils'
import { ResetPasswordRequestParams } from '@/services/interface'
import { appResetPassword } from '@/services/index'
import styles from './index.less'

const ResetPassword: React.FC = (props) => {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log('Success:', values)
    const param: ResetPasswordRequestParams = {
      userName: values.userName,
      oldPwd: encryptPassword(values.oldPassword),
      newPwd: encryptPassword(values.newPassword)
    }
    if (submitting) return
    setSubmitting(true)
    appResetPassword(param)
      .then((res) => {
        setSubmitting(false)
        const { code, msg } = res
        if (code === '00') {
          message.success('重置成功')
          history.replace('/user/login')
        } else {
          const codeMaps = {
            '18': '用户名或者密码不正确'
          }
          message.error(codeMaps[code] || msg || '未知错误')
        }
      })
      .catch((err) => {
        setSubmitting(false)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.resetWrap}>
      <div className={styles.topWrap}>
        <span>重置密码</span>
      </div>
      <div className={styles.formWrap}>
        <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input maxLength={10} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: '请输入原密码' },
              {
                max: 8,
                min: 8,
                type: 'string',
                message: '请输入8位密码'
              }
            ]}
          >
            <Input.Password maxLength={8} placeholder="请输入原密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              {
                min: 8,
                max: 8,
                type: 'string',
                message: '请输入8位密码'
              }
            ]}
          >
            <Input.Password maxLength={8} placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="newPasswordConfirm"
            validateFirst={true}
            rules={[
              { required: true, message: '请输入新密码' },
              {
                min: 8,
                max: 8,
                type: 'string',
                message: '请输入8位密码'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次密码输入不一致，请重新输入')
                }
              })
            ]}
          >
            <Input.Password maxLength={8} placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={submitting}
              size="large"
              block={true}
              type="primary"
              htmlType="submit"
              shape="round"
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default ResetPassword

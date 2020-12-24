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
          message.error(msg)
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
            <Input maxLength={64} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item name="oldPassword" rules={[{ required: true, message: '请输入原密码' }]}>
            <Input.Password maxLength={64} visibilityToggle={false} placeholder="请输入原密码" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              {
                min: 8,
                type: 'string',
                message: '密码最少为8位'
              }
            ]}
          >
            <Input.Password maxLength={64} visibilityToggle={false} placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            name="newPasswordConfirm"
            validateFirst={true}
            rules={[
              { required: true, message: '请输入新密码' },
              {
                min: 8,
                type: 'string',
                message: '密码最少为8位'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('新密码输入不一致')
                }
              })
            ]}
          >
            <Input.Password maxLength={64} visibilityToggle={false} placeholder="请输入新密码" />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default ResetPassword

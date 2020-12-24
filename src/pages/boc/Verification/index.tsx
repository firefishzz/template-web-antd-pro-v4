import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Input, Form, Button } from 'antd'

import { VerificationRequestParams } from '@/services/interface'
import { verificationQuery } from '@/services/index'
import styles from './index.less'

const Verification: React.FC<any> = (props) => {
  const [form] = Form.useForm()

  const [submitting, setSubmitting] = useState<boolean>(false)
  const onFinish = (values: VerificationRequestParams) => {
    console.log('Success:', values)
    if (submitting) return
    setSubmitting(true)
    verificationQuery(values)
      .then((res) => {
        console.log('res', res)
        setSubmitting(false)
      })
      .catch((err) => {
        setSubmitting(false)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <PageContainer>
      <Card>
        <div className={styles.verificationWrap}>
          <Form
            form={form}
            className={styles.formWrap}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="code" rules={[{ required: true, message: '请输入券码' }]}>
              <Input placeholder="请输入券码" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={submitting}
                size="large"
                block={true}
                type="primary"
                htmlType="submit"
              >
                核销
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </PageContainer>
  )
}
export default Verification

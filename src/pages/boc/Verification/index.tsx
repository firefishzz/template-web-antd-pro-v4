import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Input, Form, Button, message, Modal, Radio } from 'antd'

import { VerificationRequestParams, VerifiCompleteReq } from '@/services/interface'
import { verificationQuery, verificationComplete } from '@/services/index'
import styles from './index.less'

const Verification: React.FC<any> = (props) => {
  const [form] = Form.useForm()

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [couponList, setCouponList] = useState([])
  const [currentCouponNo, setCurrentCouponNo] = useState('')

  const onFinish = (values: VerificationRequestParams) => {
    console.log('Success:', values)
    if (submitting) return
    setSubmitting(true)
    setCurrentCouponNo('')
    verificationQuery(values)
      .then((res) => {
        console.log('res', res)
        setSubmitting(false)
        const { msg, code, couponList = [] } = res
        if (code === '00') {
          setConfirmVisible(true)
          setCouponList(couponList)
          setCurrentCouponNo(couponList.length === 1 ? couponList[0].itemNo : '')
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

  const handleSelectCouponChange = (e: any) => {
    console.log(e.target.value)
    setCurrentCouponNo(e.target.value)
  }

  const handleConfirmOk = () => {
    if (!currentCouponNo) {
      message.warning('请选择核销商品')
      return
    }

    handleConfirmCancel()

    Modal.confirm({
      content: '是否核销当前券码？',
      onOk: (close) => {
        const param: VerifiCompleteReq = {
          code: form.getFieldValue('code'),
          itemNo: currentCouponNo
        }
        verificationComplete(param).then((res) => {
          const { msg, code } = res
          if (code === '00') {
            message.success('核销成功')
            close()
          } else {
            message.error(msg)
          }
        })
      }
    })
  }
  const handleConfirmCancel = () => {
    setConfirmVisible(false)
  }

  const ModalContent = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }
    return (
      <div className={styles.modalContent}>
        <div className={styles.noticeBox}>查询到券码，点击“确定”核销商品。</div>
        <div className={styles.couponsWrap}>
          <Radio.Group onChange={handleSelectCouponChange} value={currentCouponNo}>
            {couponList.map((item: any, index: number) => {
              return (
                <Radio key={index} style={radioStyle} value={item.itemNo}>
                  {item.itemNo}
                </Radio>
              )
            })}
          </Radio.Group>
        </div>
      </div>
    )
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
        <Modal
          visible={confirmVisible}
          title={false}
          wrapClassName={styles.modalWrap}
          onOk={handleConfirmOk}
          onCancel={handleConfirmCancel}
          footer={[
            <Button key="back" onClick={handleConfirmCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={handleConfirmOk}>
              确定
            </Button>
          ]}
        >
          <ModalContent></ModalContent>
        </Modal>
      </Card>
    </PageContainer>
  )
}
export default Verification

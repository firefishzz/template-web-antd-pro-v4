import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Form, Input, InputNumber, Button, Radio, DatePicker, Upload, message } from 'antd'
import moment from 'moment'
import { queryMerchant, addCoupon, batchDownload, batchImport } from '@/services/index'
import { openDownloadDialog } from '@/utils/utils'
import styles from './index.less'

const { RangePicker } = DatePicker

const CreateCoupon: React.FC<any> = (props) => {
  const [form] = Form.useForm()

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [currentCreateType, setCurrentCreateType] = useState('system')
  const [currentTimeType, setCurrentTimeType] = useState('customize')

  const onFinish = (values: any) => {
    console.log('Success:', values)
    if (currentCreateType === 'system') {
      const param: any = {
        itemNo: values.merchantNo,
        num: values.couponNum
      }
      if (currentTimeType === 'customize') {
        const [startTime, endTime] = values.timeRange
        param.startTime = moment(startTime).format('YYYY年MM月DD日')
        param.endTime = moment(endTime).format('YYYY年MM月DD日')
      } else if (currentTimeType === 'fixed') {
        param.expired = values.fixedDays
      }
      console.log('生成', param)
      if (submitting) return
      setSubmitting(true)
      addCoupon(param)
        .then((res) => {
          setSubmitting(false)
          const { msg, code } = res
          if (code === '00') {
            message.success('生券成功')
            form.resetFields()
          } else {
            message.error(msg)
          }
        })
        .catch((err) => {
          setSubmitting(false)
        })
    } else {
      // message.warning('该功能开发中')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onFormValueChange = (values: any) => {
    const { createType, timeType } = values
    createType && setCurrentCreateType(createType)
    timeType && setCurrentTimeType(timeType)
  }

  const handleDownload = () => {
    batchDownload().then((res) => {
      const { data, response } = res
      const downLoadFileName = (response as any).headers
        .get('content-disposition')
        .split('filename=')[1]

      openDownloadDialog(data, decodeURIComponent(downLoadFileName).replace(/\"/g, ''))
    })
  }

  const uploadProps = {
    customRequest: ({ file }: any) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileType', 'xlsx')

      batchImport(formData).then((res) => {
        console.log('res', res)
        const { code, msg } = res
        if (code === '00') {
          message.success('批导成功')
        } else {
          message.error(msg)
        }
      })
    },
    fileList: []
  }

  return (
    <PageContainer>
      <Card>
        <div className={styles.createWrap}>
          <Form
            form={form}
            requiredMark={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ offset: 1 }}
            className={styles.formWrap}
            name="basic"
            initialValues={{ createType: currentCreateType, timeType: currentTimeType }}
            onValuesChange={onFormValueChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="券码创建方式"
              name="createType"
              rules={[{ required: true, message: '请输入商品名称' }]}
            >
              <Radio.Group>
                <Radio value="system">系统创建券码</Radio>
                <Radio value="import">外部导入券码</Radio>
              </Radio.Group>
            </Form.Item>

            {currentCreateType === 'system' && (
              <>
                <Form.Item
                  label="商品编号"
                  name="merchantNo"
                  validateFirst={true}
                  rules={[
                    { required: true, message: '输入商品编号' },
                    ({ getFieldValue, setFieldsValue }) => ({
                      validator(rule, value) {
                        return new Promise((resolve, reject) => {
                          queryMerchant({ itemNo: value }).then((res) => {
                            const { code, item } = res
                            if (code === '00') {
                              const { name } = item
                              name && setFieldsValue({ merchantName: name })
                              resolve()
                            } else if (code === '15') {
                              setFieldsValue({ merchantName: '' })
                              reject('请输入正确的商品编号')
                            }
                          })
                        })
                      }
                    })
                  ]}
                >
                  <Input maxLength={8} placeholder="商品编号" />
                </Form.Item>

                <Form.Item label="商品名称" name="merchantName">
                  <Input disabled placeholder="商品名称" />
                </Form.Item>

                <Form.Item
                  label="券码数量"
                  name="couponNum"
                  rules={[{ required: true, message: '请输入券码数量' }]}
                >
                  <InputNumber
                    min={1}
                    max={2000}
                    style={{ width: '120px' }}
                    placeholder="券码数量"
                  />
                </Form.Item>
                <Form.Item
                  label="券码有效期形式"
                  name="timeType"
                  rules={[{ required: true, message: '请输入券码数量' }]}
                >
                  <Radio.Group>
                    <Radio value="customize">自定义时间</Radio>
                    <Radio value="fixed">固定时间</Radio>
                  </Radio.Group>
                </Form.Item>

                {currentTimeType === 'customize' && (
                  <Form.Item
                    label="券码有效期"
                    name="timeRange"
                    rules={[{ required: true, message: '请选择券码有效期' }]}
                  >
                    <RangePicker format="YYYY-MM-DD" />
                  </Form.Item>
                )}

                {currentTimeType === 'fixed' && (
                  <Form.Item label="固定时间">
                    领取后
                    <Form.Item
                      name="fixedDays"
                      noStyle
                      rules={[{ required: true, message: '请输入券码有效期' }]}
                    >
                      <InputNumber
                        min={1}
                        max={730}
                        style={{ marginLeft: '5px', marginRight: '5px' }}
                      />
                    </Form.Item>
                    天
                  </Form.Item>
                )}
              </>
            )}

            {currentCreateType === 'import' && (
              <>
                <Form.Item label="批量导入">
                  <div className={styles.downloadText} onClick={handleDownload}>
                    模板下载
                  </div>
                </Form.Item>
              </>
            )}
            <Form.Item>
              {currentCreateType === 'system' ? (
                <Button loading={submitting} type="primary" htmlType="submit">
                  确定
                </Button>
              ) : (
                <Upload {...uploadProps}>
                  <Button loading={submitting} type="primary">
                    点击上传
                  </Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </div>
      </Card>
    </PageContainer>
  )
}

export default CreateCoupon

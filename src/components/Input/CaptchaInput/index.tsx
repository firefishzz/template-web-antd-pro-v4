import { Input } from 'antd'
import React, { ChangeEvent, useState, useEffect, useImperativeHandle } from 'react'
import { getCaptchaUrl } from '@/services/index'
import { connect, Dispatch, useIntl, FormattedMessage } from 'umi'
import classNames from 'classnames'
import styles from './index.less'

export interface CaptchaInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  innerRef?: any
  getCurrentValue?: (value?: any) => void
  refreshCaptcha?: (value?: any) => void
  className?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  maxLength?: number
}

export interface CaptchaResponse {
  token: string
  captcha: string
  image: string
  captchaImage?: string
}

const CaptchaInput: React.FC<CaptchaInputProps> = (props) => {
  const { getCurrentValue, innerRef, className, maxLength = 4, ...restProps } = props
  const [captchaData, handleCaptchaData] = useState<CaptchaResponse>()
  const [isLoading, handleIsLoading] = useState<boolean>(false)

  const handleGetCaptcha = () => {
    if (isLoading) return
    handleIsLoading(true)
    getCaptchaUrl().then((res) => {
      handleIsLoading(false)
      const { image } = res
      const newCaptcha = {
        ...res,
        captchaImage: `data:image/png;base64,${image}`
      }
      handleCaptchaData(newCaptcha)
      getCurrentValue && getCurrentValue(newCaptcha)
    })
  }

  const handleBlur = (e: any) => {
    console.log('handleBlur', e.target.value)
  }
  useEffect(() => {
    handleGetCaptcha()
  }, [])

  useImperativeHandle(innerRef, () => ({
    // changeVal 就是暴露给父组件的方法
    refreshCaptcha: handleGetCaptcha
  }))

  return (
    <div className={styles.captchaWrap}>
      <Input maxLength={maxLength} {...restProps} onBlur={handleBlur} />
      <div className={styles.imageWrap} onClick={handleGetCaptcha}>
        {captchaData && captchaData.captchaImage && <img src={captchaData.captchaImage} alt="" />}
      </div>
    </div>
  )
}

export default CaptchaInput

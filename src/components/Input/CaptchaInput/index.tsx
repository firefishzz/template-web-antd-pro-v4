import { Input } from 'antd'
import React, { ChangeEvent, useRef } from 'react'
import { connect, Dispatch, useIntl, FormattedMessage } from 'umi'
import classNames from 'classnames'
import styles from './index.less'

export interface CaptchaInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onVisibleChange?: (b: boolean) => void
  getCurrentValue?: (value?: any) => void
  className?: string
  placeholder?: string
  defaultValue?: string
  value?: string
}

const CaptchaInput: React.FC<CaptchaInputProps> = (props) => {
  const { onVisibleChange, getCurrentValue, className, ...restProps } = props

  return (
    <div className={styles.captchaWrap}>
      <Input {...restProps} />
      <div className={styles.imageWrap}></div>
    </div>
  )
}

export default CaptchaInput

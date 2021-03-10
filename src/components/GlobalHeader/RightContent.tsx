import { Settings as ProSettings } from '@ant-design/pro-layout'
import React from 'react'
import { connect, ConnectProps } from 'umi'
import { ConnectState } from '@/models/connect'
import Avatar from './AvatarDropdown'
import styles from './index.less'

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  return (
    <div className={`${styles.right}  ${styles.dark}`}>
      <Avatar />
    </div>
  )
}

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout
}))(GlobalHeaderRight)

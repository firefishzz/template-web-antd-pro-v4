import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import React from 'react'
import { history, ConnectProps, connect } from 'umi'
import { ConnectState } from '@/models/connect'
import { CurrentUser } from '@/models/user'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser
  menu?: boolean
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key
    keyPath: React.Key[]
    item: React.ReactInstance
    domEvent: React.MouseEvent<HTMLElement>
  }) => {
    const { key } = event

    if (key === 'logout') {
      const { dispatch } = this.props

      if (dispatch) {
        dispatch({
          type: 'user/logout'
        })
      }

      return
    }
  }

  render(): React.ReactNode {
    const { currentUser = {} } = this.props
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    )
    return currentUser && currentUser.userName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span>{currentUser.userName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8
          }}
        />
      </span>
    )
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser
}))(AvatarDropdown)

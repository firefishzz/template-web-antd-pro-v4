import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, useIntl, ConnectProps, connect, FormattedMessage } from 'umi'
import React from 'react'
import { ConnectState } from '@/models/connect'
import logo from '@/assets/logo_en_white.png'
import styles from './UserLayout.less'

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem
  }
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: []
    }
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: ''
    }
  } = props
  const { formatMessage } = useIntl()
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props
  })

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.loginContainer}>
        <div className={styles.logoWrap}>
          <img alt="logo" src={logo} />
        </div>
        <div className={styles.loginContent}>
          {/* <div className={styles.langWrap}>
            <SelectLang />
          </div> */}
          {children}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout)

import { MenuDataItem } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SelectLang, ConnectProps, connect } from 'umi';
import React from 'react';
import { ConnectState } from '@/models/connect';
import logo from '@/assets/logo_en_white.png';
import styles from './index.less';

export interface LoginProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const Login: React.FC<LoginProps> = (props) => {
  console.log('props', props);

  const title = 'twstTitle';

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
          <div className={styles.langWrap}>
            <SelectLang />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(Login);

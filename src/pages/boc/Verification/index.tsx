import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Alert, Typography } from 'antd'
import styles from './index.less'

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

export default (): React.ReactNode => (
  <PageContainer>
    <Card>lsllaa</Card>
  </PageContainer>
)

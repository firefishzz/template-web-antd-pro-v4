import { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings>

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: false,
  iconfontUrl: ''
}

export type { DefaultSettings }

export default proSettings

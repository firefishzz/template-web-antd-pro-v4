// https://umijs.org/config/
import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
import routes from './routes'

const { REACT_APP_ENV, REACT_APP_CIL_ENV } = process.env

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true
  },
  base: '/boc-px-plat/',
  publicPath: '/boc-px-plat/',
  define: {
    REACT_APP_CIL_ENV: REACT_APP_CIL_ENV // 全局环境变量
  },
  history: {
    type: 'browser'
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index'
  },
  targets: {
    ie: 11
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'btn-primary-bg': '#dc1320',
    'btn-default-color': '#dc1320',
    'btn-default-border': '#dc1320'
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/'
  },
  exportStatic: {},
  esbuild: {}
})

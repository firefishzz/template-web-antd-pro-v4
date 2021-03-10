export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '登陆',
        path: '/user/login',
        component: './user/login'
      },
      {
        name: '重置密码',
        path: '/user/resetPassword',
        component: './user/resetPassword'
      }
    ]
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/boc/verification'
          },
          {
            path: '/boc/verification',
            name: '查询&核销',
            icon: 'fileSearch',
            component: './boc/Verification'
          },
          {
            path: '/boc/create-coupon',
            name: '生成券码',
            icon: 'gold',
            authority: ['in'],
            component: './boc/CreateCoupon'
          },
          {
            component: './404'
          }
        ]
      },
      {
        component: './404'
      }
    ]
  },
  {
    component: './404'
  }
]

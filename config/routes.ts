export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login'
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
        authority: ['admin', 'user', 'in', 'out'],
        routes: [
          {
            path: '/',
            redirect: '/boc/verification'
          },
          {
            path: '/boc/verification',
            name: '查询&核销',
            icon: 'smile',
            component: './boc/Verification'
          },
          {
            path: '/boc/create-coupon',
            name: '生成券码',
            icon: 'smile',
            authority: ['in'],
            component: './boc/CreateCoupon'
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin']
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
  },
  {
    component: './404'
  }
]

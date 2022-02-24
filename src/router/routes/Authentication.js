import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AuthenticationRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export default AuthenticationRoutes
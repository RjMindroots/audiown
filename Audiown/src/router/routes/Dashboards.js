import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    exact: true,
    component: lazy(() => import('../../views/Dashboard')),
    meta: {
      action: 'artist',
      resource: 'dashboard'
    }
  }
]

export default DashboardRoutes

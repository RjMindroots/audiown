import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Admin Panel'

import DashboardRoutes from './Dashboards'
import AuthenticationRoutes from './Authentication'
import PagesRoutes from './Pages'
import ArtistRoutes from './ArtistRoutes'
import ProjectsRoutes from './ProjectsRoutes'


// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...ArtistRoutes,
  ...PagesRoutes,
  ...ProjectsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }

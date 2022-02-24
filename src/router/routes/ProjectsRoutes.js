import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ProjectsRoutes = [
    {
      path: '/projects',
      exact: true,
      component: lazy(() => import('../../views/Projects/Projectsview')),
      meta: {
        action: 'projects',
        resource: 'projects'
      }
    },
    {
      path: '/projects/createprojects',
      exact: true,
      component: lazy(() => import('../../views/Projects/Projectsview/CreateProject')),
      meta: {
        action: 'projects',
        resource: 'projects'
      }
    },
    {
      path: '/projects/edit/:id',
      exact: true,
      component: lazy(() => import('../../views/Projects/Projectsview/UpdateProject')),
      meta: {
        action: 'projects',
        resource: 'projects'
      }
    }
]

export default ProjectsRoutes

import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ArtistRoutes = [
    {
        path: '/artist',
        exact: true,
        component: lazy(() => import('../../views/Artists/artistview/index')),
        meta: {
          action: 'artist',
          resource: 'artist'
        }
      },
      {
        path: '/artist/createartist',
        exact: true,
        component: lazy(() => import('../../views/Artists/artistview/CreateArtist')),
        meta: {
          action: 'artist',
          resource: 'artist'
        }
      },
      {
        path: '/artist/edit/:id',
        exact: true,
        component: lazy(() => import('../../views/Artists/artistview/UpdateArtist')),
        meta: {
          action: 'artist',
          resource: 'artist'
        }
      }
]

export default ArtistRoutes

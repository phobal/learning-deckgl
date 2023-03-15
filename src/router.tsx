import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes as Routes_, Route, Navigate } from 'react-router-dom'
import Loading from '@/components/Loading'

const GenRoute: React.FC<Route> = (route) => {
  if (route.children.length === 0) {
    return <Route key={route.path} path={route.path} element={route.element} />
  } else {
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children.map((route) => GenRoute(route))}
      </Route>
    )
  }
}

const Layout = lazy(() => import('@/layout'))
const DataPage = lazy(() => import('@/views/DataPage'))
const MapPage = lazy(() => import('@/views/MapPage'))

const routes: Route[] = [
  {
    path: '/',
    element: <Navigate replace to={'/map/map'} />,
    children: [],
  },
  {
    path: '/map',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: '/map/data',
        element: (
          <Suspense fallback={<Loading />}>
            <DataPage />
          </Suspense>
        ),
        children: [],
      },
      {
        path: '/map/map',
        element: (
          <Suspense fallback={<Loading />}>
            <MapPage />
          </Suspense>
        ),
        children: [],
      },
      {
        path: '/map/*',
        element: <div>Not Found</div>,
        children: [],
      },
    ],
  },
  {
    path: '/*',
    element: <div>Not Found</div>,
    children: [],
  },
]

export const Routes: React.FC = () => (
  <BrowserRouter>
    <Routes_>{routes.map((route) => GenRoute(route))}</Routes_>
  </BrowserRouter>
)

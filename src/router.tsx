import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


// OSB Routing
const Login = Loader(lazy(() => import('src/osb_components/login/login')));

const BrickAdd =  Loader(lazy(() => import('src/osb_components/brick/add/brick-add')));

const BrickManage =  Loader(lazy(() => import('src/osb_components/brick/manage/brick-manage')));

const ClientDashboard =Loader(lazy(() => import('src/osb_components/dashboards/client/client-dashboard')));


const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          }
        ]
      }
    ]
  },
  {
    path: 'brick',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="manage" replace />
      },
      {
        path: 'manage',
        element:<BrickManage/>
      },
      {
        path: 'add',
        element: <BrickAdd />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="client" replace />
      },
      {
        path: 'client',
        element:<ClientDashboard/>
      }
    ]
  }
];

export default routes;

import * as React from 'react';
import { DvaInstance, RouterAPI, Model } from 'dva';
import { Router, RouteConfig } from 'dva/router';
import UsersModel from './models/users';

const cached = {};
function registerModel(app: DvaInstance, model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }: RouterAPI) {
  const routes: RouteConfig = [
    {
      path: '/',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage').default);
        });
      },
    },
    {
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, UsersModel);
          cb(null, require('./routes/Users').default);
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;

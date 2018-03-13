import * as React from 'react';
import { RouterAPI } from 'dva';
import dynamic from "dva/dynamic";
import { routerRedux, Route, Switch } from "dva/router";
import { LocaleProvider, Spin } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import IndexPage from "./routes/IndexPage";
import Users from "./routes/Users";

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" style={{ width: "100%", margin: "40px 0 !important" }} />;
});

function RouterConfig({ history, app }: RouterAPI) {
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact
            // component={IndexPage}
            render={(props: any) => {
              const IndexPage = require("./routes/IndexPage").default;
              return <IndexPage {...props} />;
            }}
          />
          <Route path="/users"
            // component={Users}
            render={(props: any) => {
              const Users = require("./routes/Users").default;
              return <Users {...props} />;
            }}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;

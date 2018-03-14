import * as React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore } from "mst-react-router";
import { connectReduxDevtools } from "mst-middlewares";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import { store, routerModel, usersModel } from "./models";

connectReduxDevtools(require("remotedev"), store);

const history = syncHistoryWithStore(createBrowserHistory(), routerModel);

history.listen(location => {
  if (location.pathname === "/users") {
    usersModel.reload();
  }
});

function RouterConfig() {
  return (
    <LocaleProvider locale={zhCN}>
      <Provider store={store} router={routerModel} users={usersModel}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              exact // component={IndexPage}
              render={(props: any) => {
                const IndexPage = require("./routes/IndexPage").default;
                return <IndexPage {...props} />;
              }}
            />
            <Route
              path="/users" // component={Users}
              render={(props: any) => {
                const Users = require("./routes/Users").default;
                return <Users {...props} />;
              }}
            />
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  );
}

export default RouterConfig;

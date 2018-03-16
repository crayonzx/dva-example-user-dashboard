import * as React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore } from "mobx-react-router";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import { rootStore } from "./models";

const history = syncHistoryWithStore(
  createBrowserHistory(),
  rootStore.routerStore
);

// history.subscribe(location => {
//   if (location.pathname === "/users") {
//     rootStore.usersStore.reload();
//   }
// });

function RouterConfig() {
  return (
    <LocaleProvider locale={zhCN}>
      <Provider
        store={rootStore}
        router={rootStore.routerStore}
        users={rootStore.usersStore}
      >
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

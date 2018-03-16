import { observable, reaction, useStrict } from "mobx";
import { Location } from "history";

import RouterStore from "./router";
import UsersStore from "./users";

useStrict(true);

class RootStore {
  @observable routerStore: RouterStore;
  @observable usersStore: UsersStore;
}

export const routerStore = new RouterStore();
export const usersStore = new UsersStore();
export const rootStore = new RootStore();

export { RootStore, RouterStore, UsersStore };

rootStore.routerStore = routerStore;
rootStore.usersStore = usersStore;
routerStore.location = {} as Location;

reaction(
  () => routerStore.location!.pathname,
  path => {
    window.console.log(path);
    if (path === "/users") {
      usersStore.reload();
    }
  }
);

import { observable, reaction } from "mobx";

import RouterStore from "./router";
import UsersStore from "./users";

class RootStore {
  @observable routerStore: RouterStore;
  @observable usersStore: UsersStore;

  constructor() {
    this.routerStore = new RouterStore();
    this.usersStore = new UsersStore();
  }
}

export const rootStore = new RootStore();

// reaction(
//   () => rootStore.routerStore.history!.location.pathname,
//   path => {
//     window.console.log(path);
//     if (path === "/users") {
//       rootStore.usersStore.reload();
//     }
//   }
// );

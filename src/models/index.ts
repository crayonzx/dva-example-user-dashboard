import { types } from "mobx-state-tree";
import { reaction } from "mobx";

import { routerModel, RouterModel } from "./router";
import { usersModel, UsersModel } from "./users";

reaction(
  () => routerModel.location.pathname,
  path => {
    window.console.log(path);
    if (path === "/users") {
      usersModel.reload();
    }
  }
);

// Define root model type
const RootModel = types.model({
  router: RouterModel,
  users: UsersModel
});

export const store = RootModel.create({
  router: routerModel,
  users: usersModel
});

export type RootModelType = typeof RootModel.Type;

export * from "./router";
export * from "./users";

import { types } from "mobx-state-tree";
import { autorun } from "mobx";

import { routerModel, RouterModel } from "./router";
import { usersModel, UsersModel } from "./users";

autorun(() => {
  if (routerModel.location.pathname === '/users') {
    usersModel.reload();
  }
});

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

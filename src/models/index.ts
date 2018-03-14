import { types } from "mobx-state-tree";
import { routerModel, RouterModel } from "./router";
import { usersModel, UsersModel } from "./users";

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

import { types, flow } from "mobx-state-tree";

import * as usersService from "../services/users";
import { UserRecord, UserValues } from "../components/Users/UserModal";

export const UsersModel = types
  .model("Users", {
    _list: types.frozen,
    total: 0,
    page: 0,
    loading: false
  }).views(self => ({
    get usersList(): UserRecord[] {
      return self._list;
    }
  })).actions(self => {
    function save(data: UserRecord[], total: number, page: number) {
      self._list = data;
      self.total = total;
      self.page = page;
    }

    const fetch = flow(function*(page: number) {
      self.loading = true;
      if (!page) {
        page = 1;
      }
      const { data, headers } = yield usersService.fetch({ page });
      save(
        data,
        parseInt(headers["x-total-count"], 10),
        parseInt(page as any, 10)
      );
      self.loading = false;
    });

    const reload = () => fetch(self.page);

    const remove = flow(function*(id: string) {
      yield usersService.remove(id);
      yield reload();
    });

    const patch = flow(function*(id: string, values: UserValues) {
      yield usersService.patch(id, values);
      yield reload();
    });

    const create = flow(function*(values: UserValues) {
      yield usersService.create(values);
      yield reload();
    });

    return { save, fetch, reload, remove, patch, create };
  });

export const usersModel = UsersModel.create({
  _list: [],
  total: 0,
  page: 0,
  loading: false
});

export type UsersModelType = typeof UsersModel.Type;

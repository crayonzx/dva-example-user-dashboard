import { observable, computed, action } from "mobx";
import { asyncAction } from "mobx-utils";
// import remotedev from ; // tslint:disable-line

import * as usersService from "../services/users";
import { UserRecord, UserValues } from "../components/Users/UserModal";

const remotedev = require("mobx-remotedev");

@remotedev
class UsersStore {
  @observable.shallow private _list: UserRecord[] = [];
  @observable total: number = 0;
  @observable page: number = 0;
  @observable loading: boolean = false;

  @computed
  get usersList(): UserRecord[] {
    return this._list.slice();
  }

  @action
  private save(data: UserRecord[], total: number, page: number) {
    this._list = data;
    this.total = total;
    this.page = page;
  }

  @action
  private loadingStart() {
    this.loading = true;
  }

  @action
  private loadingFinish() {
    this.loading = false;
  }

  @asyncAction
  *fetch(page: number) {
    this.loadingStart();
    if (!page) {
      page = 1;
    }
    const { data, headers } = yield usersService.fetch({ page });
    this.save(
      data,
      parseInt(headers["x-total-count"], 10),
      parseInt(page as any, 10)
    );
    this.loadingFinish();
  }

  @asyncAction
  *reload() {
    yield this.fetch(this.page);
  }

  @asyncAction
  *remove(id: string) {
    yield usersService.remove(id);
    yield this.reload();
  }

  @asyncAction
  *patch(id: string, values: UserValues) {
    yield usersService.patch(id, values);
    yield this.reload();
  }

  @asyncAction
  *create(values: UserValues) {
    yield usersService.create(values);
    yield this.reload();
  }
}

export default UsersStore;

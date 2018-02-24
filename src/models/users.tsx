import * as usersService from '../services/users';
import { Model } from 'dva';
import { LoadingState } from 'dva-loading';
import { UserRecord, UserValues } from '../components/Users/UserModal';

export interface UsersState {
  list: UserRecord[],
  total: number,
  page: number,
}

export interface AppState {
  loading: LoadingState,
  users: UsersState,
}

export enum TypeKeys {
  FETCH = 'fetch',
  REMOVE = 'remove',
  PATCH = 'patch',
  CREATE = 'create',
  RELOAD = 'reload',
}

export interface FetchAction {
  type: TypeKeys.FETCH,
  payload: { page: number },
}
export interface RemoveAction {
  type: TypeKeys.REMOVE,
  payload: string,  // id
}
export interface PatchAction {
  type: TypeKeys.PATCH,
  payload: { id: string, values: UserValues },
}
export interface CreateAction {
  type: TypeKeys.CREATE,
  payload: UserValues,  // values
}
export interface ReloadAction {
  type: TypeKeys.RELOAD,
  // payload: ,
}

export type ActionTypes = FetchAction | RemoveAction | PatchAction | CreateAction | ReloadAction;

const UsersModel: Model = {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
    page: 0,
  },
  reducers: {
    save(state: UsersState, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }: FetchAction, { call, put }) {
      window.console.log(page, typeof page);
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page as any, 10),
        },
      });
    },
    *remove({ payload: id }: RemoveAction, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }: PatchAction, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }: CreateAction, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action: ReloadAction, { put, select }) {
      const page: number = yield select((state: AppState) => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};

export default UsersModel;

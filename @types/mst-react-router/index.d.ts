import { types, IModelType, IStateTreeNode } from "mobx-state-tree";
import { History, Location, Action } from "history";

type RouterModelType = {
  location: Location;
  action: Action;

  _updateLocation(newState: Location): void;
  _setHistory(initialHistory: History): void;
  push(...args: any[]): void;
  replace(location: Location, ...args: any[]): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(...args: any[]): void;
};

export const RouterModel: IModelType<{ location?: any; action?: any }, RouterModelType>;

/**
 * Sync the history object with the given mst router store
 * @param {object} history - 'History' instance to subscribe to
 * @param {object} store - Router store instance to sync with the history changes
 */
export const syncHistoryWithStore: (history: History, store: RouterModelType) => History;

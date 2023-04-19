import { inject } from '@angular/core';
import { PAINLESS_REDUX_TOKEN } from './tokens';
import {
  ChangeOptions,
  createEntity,
  DeepPartial,
  Dictionary,
  Entity,
  EntityActionCreators,
  EntityActions,
  EntityAddListOptions,
  EntityAddOptions,
  EntityGetListOptions,
  EntityLoadListOptions,
  EntityLoadOptions,
  EntityRemoveOptions,
  EntitySchema,
  EntitySetStateOptions,
  Id,
  LoadingState,
  Page,
  PainlessRedux,
  Response$Factory,
} from 'painless-redux';

import { BehaviorSubject, Observable } from 'rxjs';

export abstract class EntityStorageService<T> {

  actionCreators: EntityActionCreators;

  private entity: Entity<T>;

  protected constructor(
    schema: Partial<EntitySchema<T>>,
  ) {
    const pr = inject<PainlessRedux>(PAINLESS_REDUX_TOKEN);
    this.entity = createEntity(pr, schema);
    this.actionCreators = this.entity.actionCreators;
  }

  get$(
    config: unknown,
    dataSource?: (Observable<T[]> | Response$Factory<T[]>),
    options?: EntityGetListOptions,
    paginatorSubj?: BehaviorSubject<boolean>,
  ): Observable<T[] | undefined> {
    return this.entity.get$(config, dataSource, options, paginatorSubj);
  }

  add(data: T, config?: unknown, options?: EntityAddOptions): EntityActions {
    return this.entity.add(data, config, options);
  }

  addList(
    data: T[],
    config?: unknown,
    isReplace?: boolean,
    hasMore?: boolean,
    options?: EntityAddListOptions,
  ): EntityActions {
    return this.entity.addList(data, config, isReplace, hasMore, options);
  }

  addRemote$(entity: T, config: unknown, dataSource$: Observable<T>, options?: EntityAddOptions): Observable<T> {
    return this.entity.addRemote$(entity, config, dataSource$, options);
  }

  affectState(
    config?: unknown,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectState(config, key, rethrow);
  }

  affectStateByConfigOrId(
    config?: unknown,
    id?: Id,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectStateByConfigOrId(config, id, key, rethrow);
  }

  affectStateById(
    id?: Id,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectStateById(id, key, rethrow);
  }

  batch(actions: EntityActions[]): EntityActions {
    return this.entity.batch(actions);
  }

  change(id: Id, patch: DeepPartial<T>, options?: ChangeOptions): EntityActions {
    return this.entity.change(id, patch, options);
  }

  changeRemote$(
    id: Id,
    patch: DeepPartial<T>,
    dataSource$: Observable<DeepPartial<T> | undefined>,
    options?: ChangeOptions,
  ): Observable<DeepPartial<T>> {
    return this.entity.changeRemote$(id, patch, dataSource$, options);
  }

  clear(config: unknown): EntityActions {
    return this.entity.clear(config);
  }

  clearAll(): EntityActions {
    return this.entity.clearAll();
  }

  getAll$(): Observable<T[] | undefined> {
    return this.entity.getAll$();
  }

  getLoadingState$(): Observable<LoadingState | undefined> {
    return this.entity.getLoadingState$();
  }

  getLoadingStateById$(id: Id, isAsap?: boolean): Observable<LoadingState | undefined> {
    return this.entity.getLoadingStateById$(id, isAsap);
  }

  getLoadingStates$(): Observable<Dictionary<LoadingState>> {
    return this.entity.getLoadingStates$();
  }

  getPage$(config: unknown, isAsap?: boolean): Observable<Page | undefined> {
    return this.entity.getPage$(config, isAsap);
  }

  getPageLoadingState$(config: unknown, isAsap?: boolean): Observable<LoadingState | undefined> {
    return this.entity.getPageLoadingState$(config, isAsap);
  }

  getPages$(): Observable<Page[]> {
    return this.entity.getPages$();
  }

  loadById$(id: Id, dataSource$: Observable<T>, options?: EntityLoadOptions): Observable<never> {
    return this.entity.loadById$(id, dataSource$, options);
  }

  loadList$(
    config: unknown,
    dataSource: Observable<T[]> | Response$Factory<T[]>,
    options?: EntityLoadListOptions,
    paginatorSubj?: BehaviorSubject<boolean>,
  ): Observable<never> {
    return this.entity.loadList$(config, dataSource, options, paginatorSubj);
  }

  remove(id: Id, options?: EntityRemoveOptions): EntityActions {
    return this.entity.remove(id, options);
  }

  removeRemote$<R>(id: Id, observable: Observable<R>, options?: EntityRemoveOptions): Observable<R> {
    return this.entity.removeRemote$(id, observable, options);
  }

  restoreRemoved(id: Id): EntityActions {
    return this.entity.restoreRemoved(id);
  }

  setState(state: LoadingState, config?: unknown, options?: EntitySetStateOptions): EntityActions {
    return this.entity.setState(state, config, options);
  }

  setStateBus(state: LoadingState, id?: Id, config?: unknown, key?: string): EntityActions {
    return this.entity.setStateBus(state, id, config, key);
  }

  setStateById(id: Id, state: LoadingState, options?: EntitySetStateOptions): EntityActions {
    return this.entity.setStateById(id, state, options);
  }

  setStateForKey(id: Id, key: string, state: LoadingState, options?: EntitySetStateOptions): EntityActions {
    return this.entity.setStateForKey(id, key, state, options);
  }

}

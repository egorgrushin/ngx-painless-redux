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
  EntityGetOptions,
  EntityLoadListOptions,
  EntityLoadOptions,
  EntityRemoveOptions,
  EntitySchema,
  EntitySetLoadingStateOptions,
  Id,
  IdPatch,
  IdPatchRequest,
  LoadingState,
  Page, PaginatedResponse,
  PainlessRedux,
  PatchRequest,
  Response$Factory,
  ResponseArray,
} from 'painless-redux';

import { BehaviorSubject, Observable } from 'rxjs';

export abstract class EntityStorageService<T> {

  actionCreators: EntityActionCreators<T>;

  private entity: Entity<T>;

  protected constructor(
    schema: Partial<EntitySchema<T>>,
  ) {
    const pr = inject<PainlessRedux>(PAINLESS_REDUX_TOKEN);
    this.entity = createEntity(pr, schema);
    this.actionCreators = this.entity.actionCreators;
  }

  getById$(
    id: Id,
    dataSource?: Observable<T>,
    options?: EntityGetOptions,
  ): Observable<T | undefined> {
    return this.entity.getById$(id, dataSource, options);
  }

  get$(
    config: unknown,
    dataSource?: Observable<ResponseArray<T>> | Response$Factory<T>,
    options?: EntityGetListOptions,
    paginatorSubj?: BehaviorSubject<boolean>,
  ): Observable<T[] | undefined> {
    return this.entity.get$(config, dataSource, options, paginatorSubj);
  }

  getDictionary$(
    config: unknown,
    dataSource?: Observable<ResponseArray<T>> | Response$Factory<T>,
    options?: EntityGetListOptions,
    paginatorSubj?: BehaviorSubject<boolean>,
  ): Observable<Dictionary<T>> {
    return this.entity.getDictionary$(config, dataSource, options, paginatorSubj);
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

  affectLoadingState(
    config?: unknown,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectLoadingState(config, key, rethrow);
  }

  affectLoadingStateByConfigOrId(
    config?: unknown,
    id?: Id,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectLoadingStateByConfigOrId(config, id, key, rethrow);
  }

  affectLoadingStateById(
    id?: Id,
    key?: string,
    rethrow?: boolean,
  ) {
    return this.entity.affectLoadingStateById(id, key, rethrow);
  }

  batch(actions: EntityActions[]): EntityActions {
    return this.entity.batch(actions);
  }

  change(
    id: Id,
    patch: PatchRequest<T>,
    options?: ChangeOptions,
  ): EntityActions {
    return this.entity.change(id, patch, options);
  }

  changeList(
    patches: IdPatchRequest<T>[],
    options?: ChangeOptions,
  ): EntityActions {
    return this.entity.changeList(patches, options);
  }

  changeRemote$(
    id: Id,
    patch: PatchRequest<T>,
    dataSource$: Observable<DeepPartial<T> | undefined>,
    options?: ChangeOptions,
  ): Observable<DeepPartial<T>> {
    return this.entity.changeRemote$(id, patch, dataSource$, options);
  }

  changeListRemote$(
    patches: IdPatchRequest<T>[],
    dataSource$: Observable<IdPatch<T>[] | undefined>,
    options?: ChangeOptions,
  ): Observable<IdPatch<T>[] | undefined> {
    return this.entity.changeListRemote$(patches, dataSource$, options);
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

  loadById$(id: Id, dataSource$: Observable<T>, options?: EntityLoadOptions): Observable<T> {
    return this.entity.loadById$(id, dataSource$, options);
  }

  loadList$(
    config: unknown,
    dataSource: Observable<ResponseArray<T>> | Response$Factory<T>,
    options?: EntityLoadListOptions,
    paginatorSubj?: BehaviorSubject<boolean>,
  ): Observable<PaginatedResponse<T>> {
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

  setLoadingState(state: LoadingState, config?: unknown, options?: EntitySetLoadingStateOptions): EntityActions {
    return this.entity.setLoadingState(state, config, options);
  }

  setLoadingStateBus(state: LoadingState, id?: Id, config?: unknown, key?: string): EntityActions {
    return this.entity.setLoadingStateBus(state, id, config, key);
  }

  setLoadingStateById(id: Id, state: LoadingState, options?: EntitySetLoadingStateOptions): EntityActions {
    return this.entity.setLoadingStateById(id, state, options);
  }

  setLoadingStateForKey(id: Id, key: string, state: LoadingState, options?: EntitySetLoadingStateOptions): EntityActions {
    return this.entity.setLoadingStateForKey(id, key, state, options);
  }

}

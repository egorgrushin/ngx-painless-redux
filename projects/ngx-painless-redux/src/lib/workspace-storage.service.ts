import {
  ChangeOptions,
  createWorkspace,
  DeepPartial,
  Id,
  LoadingState,
  LoadingStateSetOptions,
  PainlessRedux,
  Workspace,
  WorkspaceActionCreators,
  WorkspaceActions,
  WorkspaceSchema,
} from 'painless-redux';
import { inject } from '@angular/core';
import { PAINLESS_REDUX_TOKEN } from './tokens';
import { Observable } from 'rxjs';

export abstract class WorkspaceStorageService<T> implements Workspace<T> {
  actionCreators: WorkspaceActionCreators;
  private workspace: Workspace<T>;

  protected constructor(
    schema: Partial<WorkspaceSchema<T>>,
  ) {
    const pr = inject<PainlessRedux>(PAINLESS_REDUX_TOKEN);
    this.workspace = createWorkspace(pr, schema);
    this.actionCreators = this.workspace.actionCreators;
  }

  batch(actions: WorkspaceActions[]): WorkspaceActions {
    return this.workspace.batch(actions);
  }

  change(
    patch: DeepPartial<T> | ((value: (DeepPartial<T> | undefined)) => DeepPartial<T>),
    label: string,
    options?: ChangeOptions
  ): WorkspaceActions {
    return this.workspace.change(patch, label, options);
  }

  changeRemote$(
    patch: DeepPartial<T>,
    dataSource$: Observable<DeepPartial<T> | undefined>,
    label: string,
    options?: ChangeOptions
  ): Observable<DeepPartial<T>> {
    return this.workspace.changeRemote$(patch, dataSource$, label, options);
  }

  get$(): Observable<T | undefined> {
    return this.workspace.get$();
  }

  getLoadingState$(isAsap?: boolean): Observable<LoadingState | undefined> {
    return this.workspace.getLoadingState$(isAsap);
  }

  setLoadingState(state: LoadingState, key?: string, options?: LoadingStateSetOptions): WorkspaceActions {
    return this.workspace.setLoadingState(state, key, options);
  }

}

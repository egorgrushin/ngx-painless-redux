import { NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { createPainlessRedux } from 'painless-redux';
import { PAINLESS_REDUX_TOKEN } from './tokens';

export function factory(rxStore: Store<any>) {
  return createPainlessRedux(rxStore);
}

@NgModule({
  providers: [
    {
      provide: PAINLESS_REDUX_TOKEN,
      useFactory: factory,
      deps: [Store],
    },
  ],
})
export class NgxPainlessReduxModule {}

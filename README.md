#NgxPainlessRedux

###Description

This is [painless-redux](https://github.com/egorgrushin/painless-redux) adapter for Angular using [@ngrx/store](https://www.npmjs.com/package/@ngrx/store).

###Install: 
- `npm i painless-redux ngx-painless-redux @ngrx/store`
- Import `NgxPainlessReduxModule` to your app module next to StoreModule from [@ngrx/store](https://www.npmjs.com/package/@ngrx/store):

```
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    NgxPainlessReduxModule, // <-- here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```


- Inherit from `EntityStorageService`:

```
import { Injectable } from '@angular/core';
import { EntityStorageService } from 'ngx-painless-redux';

export interface Entity1 {
  id: string;
  name: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class Entity1Storage extends EntityStorageService<Entity1> {

  constructor() {
    super({ name: 'Entity1', pageSize: 2, maxPagesCount: 2 });
  }
}
```

- or from `WorkspaceStorageService`:

```
import { Injectable } from '@angular/core';
import { WorkspaceStorageService } from 'ngx-painless-redux';

export interface Workspace1 {
  filter: number[];
}

@Injectable({ providedIn: 'root' })
export class Workspace1Storage extends WorkspaceStorageService<Workspace1> {

  constructor() {
    super({
      name: 'Workspace1', 
      initialValue: {
        filter: [1, 2, 3],
      },
    });
  }
}
```
- inject it to your components / services

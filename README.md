# NgxPainlessRedux

### Description

This is [painless-redux](https://github.com/egorgrushin/painless-redux) adapter for Angular using [@ngrx/store](https://www.npmjs.com/package/@ngrx/store).

### Install: 
1. `npm i painless-redux ngx-painless-redux @ngrx/store`
2. Import `NgxPainlessReduxModule` to your app module next to `StoreModule` from [@ngrx/store](https://www.npmjs.com/package/@ngrx/store):

```typescript
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


3. Inherit from `EntityStorageService`:

```typescript
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

4. or from `WorkspaceStorageService`:

```typescript
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
5. inject it to your components / services

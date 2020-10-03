
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        canLoad: [AuthGuard],
        component: PagesComponent,
       // children: [  ]
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
      },
]


@NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
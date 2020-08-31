
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        component: PagesComponent,
        children: [
          {path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
          {path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'}},
          {path: 'grafica1', component: Grafica1Component, data:{titulo: 'Charts#1'}},
          {path: 'promesas', component: PromesasComponent, data:{titulo: 'Promises'}},
          {path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},
          {path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Account-settings'}}

          // {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
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
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule, Routes} from '@angular/router';

import { Error404Component } from './error404/error404.component';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
  // path: '/dashboard' PagesRoutingModule
  // path: '/auth'  AuthRoutingModule
{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{path: '**', component: Error404Component}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

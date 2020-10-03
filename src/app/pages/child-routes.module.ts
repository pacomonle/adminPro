import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'}},
  { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Charts#1'}},
  { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promises'}},
  { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},
  { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Account-settings'}},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},

  // mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento Hospitales' }},
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento Medicos' }},
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},

  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChildRoutesModule { }

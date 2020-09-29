import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

 // public menu = [];

  // tslint:disable-next-line: typedef
  cargarMenu() {
  // this.menu = JSON.parse(localStorage.getItem('menu')) || [];
   return JSON.parse(localStorage.getItem('menu')) || [];
  }

 /*  menu: any[] = [
      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Main', url: '/' },
          { titulo: 'ProgressBar', url: 'progress' },
          { titulo: 'Charts', url: 'grafica1' },
          { titulo: 'Promesas', url: 'promesas' },
          { titulo: 'RXJS', url: 'rxjs' }
        ]
      },
      {
        titulo: 'Mantenimientos',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Hospitales', url: 'hospitales' },
          { titulo: 'Médicos', url: 'medicos' },
        ]
      },
  ]; */

  constructor() { }
}

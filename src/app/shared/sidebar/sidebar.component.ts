import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public usuario: Usuario;
  public menuItems: any [];

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.cargarMenu();

    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
   //  console.log(this.usuario);
   // console.log(this.sidebarService.cargarMenu());
  }

  logout(): any {
    this.usuarioService.logout();
  }
}

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
  menuItems: any [];

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    console.log(this.usuario);
  }

  logout(): any {
    this.usuarioService.logout();
  }
}

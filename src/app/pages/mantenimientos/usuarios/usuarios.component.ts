import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-inferrable-types
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  // tslint:disable-next-line: no-inferrable-types
  public desde: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios(): any {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe(
      (resp) => {
        // transformar la response para obtener la url de la imagen
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
        );
        const total = resp.total;
        console.log(usuarios, total);
        // asignar estados al componente
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;

       }
    );
  }

  cambiarPagina( valor: number ): any {
    this.desde += valor;
// validacion del desde entre 0 y total de usuarios
    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ): any {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( (resp: Usuario[]) => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario( usuario: Usuario ): any {

    console.log(usuario.uid);
    console.log(this.usuarioService.uid);

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
            console.log(resp)
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    });
  }
  cambiarRole( usuario: Usuario ): any {

    return this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
      });
  }


  abrirModal( usuario: Usuario ): any {

    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }
}

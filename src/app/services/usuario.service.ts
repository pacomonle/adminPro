import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http'
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';



// se define fuera de la class para no tener que usar el this
const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
   }

   get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  googleInit(): any {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '889978114165-52hrctp7tfmc5d8lg150a3b3h9fm9ekp.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });

  }


crearUsuario( formData: RegisterForm ): any {

  console.log('crear usuario service');

  return this.httpClient.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token );
                })
              );

  }

  login( formData: LoginForm ): any {

    return this.httpClient.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token );
                  })
                );

  }

  loginGoogle( token ): any {

    return this.httpClient.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token );
                  })
                );

  }

  logout(): any {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

     this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
       });
    });

  }

  validarToken(): Observable<boolean> {
    const token = this.token;

    return this.httpClient.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        console.log(resp);
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ): any {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.httpClient.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  cargarUsuarios( desde: number = 0 ): any{

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.httpClient.get<CargarUsuario>( url, this.headers ).pipe(delay(500));
   // return this.httpClient.get<{total: Number, usuarios: Usuario[]}>( url, this.headers )
    /*  hay que dar el tipado de la resp
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            );
            */
  }

eliminarUsuario( usuario: Usuario ): any {
   // console.log(usuario.uid)
    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    console.log(url);
    console.log(this.headers)
    return this.httpClient.delete( url, { headers: {
      'x-token': this.token
    }
  });
}

guardarUsuario( usuario: Usuario ): any {

  return this.httpClient.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

}





}

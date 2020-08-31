import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// se define fuera de la class para no tener que usar el this
const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
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
              )

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
                    localStorage.setItem('token', resp.token )
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
    const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }


}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService,
               private router: Router) {}

 // tslint:disable-next-line: max-line-length
 canLoad(route: Route, segments: import('@angular/router').UrlSegment[]): boolean | import('@angular/router').UrlTree | import('rxjs').Observable<boolean | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
       return this.usuarioService.validarToken()
            .pipe(
                   tap( estaAutenticado =>  {
                        if ( !estaAutenticado ) {
                          this.router.navigateByUrl('/login');
                        }
                      })
                    );
              }

  // tslint:disable-next-line: typedef
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.usuarioService.validarToken()
        .pipe(
          tap( estaAutenticado =>  {
            if ( !estaAutenticado ) {
              this.router.navigateByUrl('/login');
            }
          })
        );
  }
}

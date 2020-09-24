import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
// import { Hospital } from '../models/hospital.model';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  // tslint:disable-next-line: typedef
  cargarHospitales(): any {

    const url = `${ base_url }/hospitales`;
    return this.http.get<CargarHospital>( url, this.headers ).pipe(delay(350));
             /*
              .pipe(
                map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
              );
              */
  }

  crearHospital( nombre: string ): any {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  actualizarHospital( _id: string, nombre: string  ): any {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  // tslint:disable-next-line: variable-name
  borrarHospital( _id: string ): any {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}

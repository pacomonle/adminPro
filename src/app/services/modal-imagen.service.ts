import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // tslint:disable-next-line: no-inferrable-types
  // tslint:disable-next-line: variable-name
  private _ocultarModal = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;
  // crear observable con el event emitter
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(): any {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'
    ): any {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // localhost:3000/api/upload/medicos/no-img
    if ( img.includes('https') ) {
        this.img = img;
      } else {
        this.img = `${ base_url }/upload/${ tipo }/${ img }`;
      }
  }

  cerrarModal(): any {
    this._ocultarModal = true;
  }

  constructor() { }
}

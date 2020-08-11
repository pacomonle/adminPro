import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // al definir la promesa hay que poner el callbakc que queremos ejecutar
    const promesa = new Promise( (resolve, reject) => {

      true ? resolve('hola mundo') : reject('Algo salio mal');

    });
 // la resolucion de las promesas es su parte asincrona
    promesa.then( (response) => {
      console.log(response);
    });
    promesa.catch( (error) =>{
      console.log(error);
    });

    console.log('Fin del oninit');


    this.getUsuarios().then(usuarios => console.log(usuarios));
  }



  getUsuarios(): any{

    const promesa = new Promise (
      resolve => {
        fetch('https://reqres.in/api/users?page=2')
        .then( response =>  response.json())
        .then( res => resolve(res.data));
      }
    );
    return promesa;
  }

}

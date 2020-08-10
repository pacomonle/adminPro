import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
 // selecionar del DOM el id theme del index.html
  private linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('service settings init');
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', url);
   }

   changeTheme(color: string): any{
    console.log(color);
    const url = `./assets/css/colors/${color}.css`;
    console.log(url);
    // javascript para cambiar el valor de un atributo de una etiqueta del html
    this.linkTheme.setAttribute('href', url);
    // hacer persitente los cambios -usar localStorage
    localStorage.setItem('theme', url);
     // hacer el check al elemento seleccionado
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void{
 // selecionar la class comun que tienen todos los elementos -> "selector"
    const links: NodeListOf<Element> = document.querySelectorAll('.selector') ;

    links.forEach(element =>{
     // 1. borrar la clase working por si la tiene
     element.classList.remove('working');
     // 2. hacer match entre el url del theme selecionado y el linkthem para incluir la class working
     const btnTheme = element.getAttribute('data-theme');
     const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

     const themeCurrentUrl = this.linkTheme.getAttribute('href');
     // 3. añadir la class working al element que haga match
     if (btnThemeUrl === themeCurrentUrl){
       element.classList.add('working');
     }

   });

 }


}
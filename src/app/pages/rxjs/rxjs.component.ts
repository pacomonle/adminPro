import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

public intervalSubs: Subscription;
public retornaSubs: Subscription;

  constructor() {

  // nos subcribimos al Obserbable
  this.retornaSubs = this.retornaObservable()
    .pipe(retry()) // (2) veces que quieres que lo repita, retry - hay que importarlo de 'rxjs/operators'
    .subscribe(
      valor => console.log('subscribe: ', valor),
      error => console.warn('Error: ', error),
      // complete no manda argumentos
      () => console.log('obs terminado')
      );

   // nos subscribimos al Obserbable
  this.intervalSubs = this.retornaIntervalo().subscribe( valor =>  console.log(valor));
  }
  ngOnDestroy(): void {
    // cuando se detsruye el elemento hay que limpiar las subscribe
     this.intervalSubs.unsubscribe();
     this.retornaSubs.unsubscribe();
  }

  ngOnInit(): void {

  }



  retornaIntervalo(): Observable<number>{
    // se pone el $ para indicar que es un observable
     const intervalo$ = interval(1000) // (period?:number)
                                .pipe(
                                 // take(10),
                                  map( valor =>  (valor + 2)),
                                  filter( valor => (valor % 2 === 0) ? true : false)
                                );
     return intervalo$;
  }

 retornaObservable(): Observable<number> {
        let i = -1;
        const obs$ = new Observable<number>( (observer) => {
          const intervalo =  setInterval( () => {
            i++;
            // para que un observable emita necesita el .next()
            observer.next(i);
            if (i === 4){
               clearInterval(intervalo);
               observer.complete();
            }
            if (i === 2){
                console.log('i llego al valor de 2');
                observer.error('i llego al valor de 2');
           }
          }, 1000);

        });
        return obs$;
      }
}

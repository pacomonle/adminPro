import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  // renombrar un @input
 // @Input('valor') progreso: number = 50;
 @Input() progreso: number;
 @Input() btnClass: string;

 @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }


  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number): number{
    if (this.progreso === 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso === 0 && valor <= 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor ;
    this.valorSalida.emit(this.progreso);
  }

  onChange(event: number): any{
    // console.log(event);
    if(event > 100){
      this.progreso = 100;
    }else if (event < 0){
      this.progreso = 0;
    }else{
      this.progreso = event;
    }
    this.valorSalida.emit(this.progreso);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progreso1 = 45;
  progreso2 = 35;

  // hacemos un getter para devolver el procentaje y no un numero
  get getPorcentaje1(): string{
    return `${this.progreso1}%`;
}

// hacemos un getter para devolver el procentaje y no un numero
get getPorcentaje2(): string{
  return `${this.progreso2}%`;
}


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    // recuperar params por url
    this.activatedRoute.params
    .subscribe( ({ termino }) => this.busquedaGlobal( termino ));
  }

  busquedaGlobal( termino: string ): any {
    console.log(termino);

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.medicos    = resp.medicos;
          this.hospitales = resp.hospitales;
        });

  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute) {
   this.tituloSubs$ = this.getParametrosRouter().subscribe(
                        data => {
                          console.log(data);
                          this.titulo = data.titulo;
                          // para cambiar el titulo en la pestaña del navegado:
                          document.title = `Admin-pro - ${this.titulo}`;
                        }
                      );
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  ngOnInit(): void {
    console.log('route', this.route.snapshot.children);
    console.log(this.route.snapshot.children[0].data);

  }


  getParametrosRouter(): Observable<any> {
      // es un observable al que nos podemos subscribir
    return  this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd), // filtrar solo los evento correpondientes ACtivationEnd
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
        );
  }
}

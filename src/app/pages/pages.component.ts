import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import {customInitFunctions} from '../../assets/js/custom.js';
// import { SidebarService } from '../services/sidebar.service';

// tslint:disable-next-line: typedef
// declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingService: SettingsService
   // , private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
   // this.sidebarService.cargarMenu();
  }

}

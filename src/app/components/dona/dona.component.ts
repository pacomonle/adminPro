import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})



export class DonaComponent implements OnInit {

@Input() title: string = 'sin titulo';
@Input() labels: Array<string> = ['label1', 'label2', 'label3'];
@Input() data = [
  [150, 50, 400],
]

// Doughnut
public doughnutChartLabels: Label[];
public doughnutChartData: MultiDataSet;
public doughnutChartType: ChartType = 'doughnut';
public colors: Color[] = [
  {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
]

  constructor() { }

  ngOnInit(): void {

  this.doughnutChartLabels = this.labels;
  // console.log(this.doughnutChartLabels);
  this.doughnutChartData = this.data;
  console.log(this.doughnutChartData);

  }

}

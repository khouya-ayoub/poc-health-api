import { Component, OnInit } from '@angular/core';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ChartsModule, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  datas: any[] = [];
  public lineChartData: ChartDataSets[] = [
    {
      id: 1,
      data: [10, 20, 60, 80],
      label : 'Cardiac'
    },
    {
      id: 2,
      data: [80, 10, 30],
      label : 'Breath'
    }
  ];

  lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'April', 'Mai', 'Juin', 'Juillet'];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    public http: HttpClient,
    public chart: ChartsModule
  ){}
  ngOnInit(): void {
    this.getDiagnostic();
  }

  async getDiagnostic() {
    const local = 'http://localhost:3000';
    this.http.get(local + '/api-health/get-all-patients')
    .pipe(
        tap((data: any[]) => {
          this.datas = data;
          const cardiac = [];
          const breath = [];


        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
    ).subscribe();
  }

  getDatas(id: number) {
    const lineChartData: ChartDataSets[] = [];
    lineChartData.push({
      data: this.lineChartData.filter((item: any) => item.id === id)[0].data,
      label: 'Cardiac'
    });

    return lineChartData;
  }

}

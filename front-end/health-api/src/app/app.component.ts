import { Component, OnInit } from '@angular/core';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChartsModule, Color, Label } from 'ng2-charts';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  datas: any[] = [];
  lineChartData = [];

  lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';



  constructor(
    public http: HttpClient,
    public chart: ChartsModule
  ){}
  ngOnInit(): void {
    this.getDiagnostic();
    this.asyncObservable().subscribe();
  }

  async getDiagnostic() {
    const local = 'http://localhost:3000';
    this.http.get(local + '/api-health/get-all-patients')
    .pipe(
        tap((data: any[]) => {
          this.datas = data;
          this.datas.forEach((element: any) => {
            this.lineChartData.push(
              [
                {
                  id: element.id,
                  data: [element.cardiac],
                  label: 'Cardiac'
                },
                {
                  id: element.id,
                  data: [element.breath],
                  label: 'Breath'
                }
              ],
            )
          })
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
    ).subscribe();
  }

  getDatas() {
    setTimeout(() => {
      return this.lineChartData;
    }, 1000);
  }

  asyncObservable() {
    return new Observable(observer => {
      setInterval(() => {
        const local = 'http://localhost:3000';
    this.http.get(local + '/api-health/get-all-patients')
    .pipe(
      tap((data: any[]) => {
        let patient: any;
        data.forEach((element: any) => {
          if(this.lineChartData[element.id - 1]) {
          patient = this.lineChartData[element.id-1];
          this.lineChartData[element.id-1][0].data.push(element.cardiac);
          this.lineChartData[element.id-1][1].data.push(element.breath);
          }
        })
      })
    ).subscribe();

    if(this.lineChartData[0][0].data.length >= 20) {
      this.lineChartLabels.push((this.lineChartLabels.length + 1).toString())
      if(this.lineChartData[0][0].data.length >= 30) {
        this.lineChartData = [];
        this.lineChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
        this.getDiagnostic();
      }
    }

      }, 700)
    })
  }

}

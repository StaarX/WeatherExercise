import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../canvasjs.min';
import { Router } from '@angular/router';
import { RestApiService } from "../../shared/rest-api.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {EventEmitterService} from '../../event-emitter.service';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  days=[];
  city="Ciudad Obregón";
  temperature="Cº";
  constructor( 
    public restApi:RestApiService,
    public router:Router,
    public flashMessage: FlashMessagesService,
    private eventEmitterService:EventEmitterService) {
  }
  
  ngOnInit() {
  this.updateGraphCity("Ciudad Obregón");
  if(this.eventEmitterService.subsVar==undefined){
    this.eventEmitterService.subsVar = this.eventEmitterService.invokator.subscribe((data:any)=>{
      if (data.op=='cd') {
      this.updateGraphCity(data.data);
      }
      if (data.op=='dg') {  
    this.updateGraphScale(data.data); 
      }
    });
  }
  }
  updateGraphCity(city:string){
    this.restApi.getLast15Days(city).subscribe((datagraph:any)=>{
      this.city=city;
      var points=[];
      this.days=[];
      for (let index = 0; index < 15; index++) {
       this.days.push(datagraph.days[index]);
       var aux=datagraph.days[index].datetime.split("-"); 
       points.push({year:aux[0],
                   month:aux[1],
                   day:aux[2],
                   temp:datagraph.days[index].temp});
      }
      let chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Weather"
        },
        subtitles:[{
          text: "City: "+this.city
        }],axisX: {
          valueFormatString: "DD MMM YY"
        },
        axisY:{
          title: "Temperature (in "+this.temperature+")",
          valueFormatString: "#0º"
        },
        data: [
        {
          type: "line",
          xValueFormatString:"DD,MMM,YYYY",
          yValueFormatString:"###.#º",                
          dataPoints: [
                    {x: new Date(points[0].year,points[0].month,points[0].day),y:points[0].temp},
                    {x: new Date(points[1].year,points[1].month,points[1].day),y:points[1].temp},
                    {x: new Date(points[2].year,points[2].month,points[2].day),y:points[2].temp},
                    {x: new Date(points[3].year,points[3].month,points[3].day),y:points[3].temp},
                    {x: new Date(points[4].year,points[4].month,points[4].day),y:points[4].temp},
                    {x: new Date(points[5].year,points[5].month,points[5].day),y:points[5].temp},
                    {x: new Date(points[6].year,points[6].month,points[6].day),y:points[6].temp},
                    {x: new Date(points[7].year,points[7].month,points[7].day),y:points[7].temp},
                    {x: new Date(points[8].year,points[8].month,points[8].day),y:points[8].temp},
                    {x: new Date(points[9].year,points[9].month,points[9].day),y:points[9].temp},
                    {x: new Date(points[10].year,points[10].month,points[10].day),y:points[10].temp},
                    {x: new Date(points[11].year,points[11].month,points[11].day),y:points[11].temp},
                    {x: new Date(points[12].year,points[12].month,points[12].day),y:points[12].temp},
                    {x: new Date(points[13].year,points[13].month,points[13].day),y:points[13].temp},
                    {x: new Date(points[14].year,points[14].month,points[14].day),y:points[14].temp}
          ]
        }]
      });
        
      chart.render();  
    });
     
  }
  updateGraphScale(degrees:string){
    if (degrees=="Fahrenheit") {
      this.days.forEach(element => {
        element.temp=((element.temp*1.8)+32);
      });
      this.temperature="Fº";
      
    var points=[]
    for (let index = 0; index < 15; index++) {
     var aux=this.days[index].datetime.split("-"); 
     points.push({year:aux[0],
                 month:aux[1],
                 day:aux[2],
                 temp:this.days[index].temp});
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Weather"
      },
      subtitles:[{
        text: "City: "+this.city
      }],axisX: {
        valueFormatString: "DD MMM YY"
      },
      axisY:{
        title: "Temperature (in "+this.temperature+")",
        valueFormatString: "#0º"
      },
      data: [
      {
        type: "line",
        xValueFormatString:"DD,MMM,YYYY",
        yValueFormatString:"###.#º",                
        dataPoints: [
                  {x: new Date(points[0].year,points[0].month,points[0].day),y:points[0].temp},
                  {x: new Date(points[1].year,points[1].month,points[1].day),y:points[1].temp},
                  {x: new Date(points[2].year,points[2].month,points[2].day),y:points[2].temp},
                  {x: new Date(points[3].year,points[3].month,points[3].day),y:points[3].temp},
                  {x: new Date(points[4].year,points[4].month,points[4].day),y:points[4].temp},
                  {x: new Date(points[5].year,points[5].month,points[5].day),y:points[5].temp},
                  {x: new Date(points[6].year,points[6].month,points[6].day),y:points[6].temp},
                  {x: new Date(points[7].year,points[7].month,points[7].day),y:points[7].temp},
                  {x: new Date(points[8].year,points[8].month,points[8].day),y:points[8].temp},
                  {x: new Date(points[9].year,points[9].month,points[9].day),y:points[9].temp},
                  {x: new Date(points[10].year,points[10].month,points[10].day),y:points[10].temp},
                  {x: new Date(points[11].year,points[11].month,points[11].day),y:points[11].temp},
                  {x: new Date(points[12].year,points[12].month,points[12].day),y:points[12].temp},
                  {x: new Date(points[13].year,points[13].month,points[13].day),y:points[13].temp},
                  {x: new Date(points[14].year,points[14].month,points[14].day),y:points[14].temp}
        ]
      }]
    });
      
    chart.render(); 
    }
    if(degrees=="Celsius"){
      this.days.forEach(element => {
        element.temp=((element.temp-32)*(5/9));
      });
      this.temperature="Cº";
      
    var points=[]
    for (let index = 0; index < 15; index++) {
     var aux=this.days[index].datetime.split("-"); 
     points.push({year:aux[0],
                 month:aux[1],
                 day:aux[2],
                 temp:this.days[index].temp});
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Weather"
      },
      subtitles:[{
        text: "City: "+this.city
      }],axisX: {
        valueFormatString: "DD MMM YY"
      },
      axisY:{
        title: "Temperature (in "+this.temperature+")",
        valueFormatString: "#0º"
      },
      data: [
      {
        type: "line",
        xValueFormatString:"DD,MMM,YYYY",
        yValueFormatString:"###.#º",                
        dataPoints: [
                  {x: new Date(points[0].year,points[0].month,points[0].day),y:points[0].temp},
                  {x: new Date(points[1].year,points[1].month,points[1].day),y:points[1].temp},
                  {x: new Date(points[2].year,points[2].month,points[2].day),y:points[2].temp},
                  {x: new Date(points[3].year,points[3].month,points[3].day),y:points[3].temp},
                  {x: new Date(points[4].year,points[4].month,points[4].day),y:points[4].temp},
                  {x: new Date(points[5].year,points[5].month,points[5].day),y:points[5].temp},
                  {x: new Date(points[6].year,points[6].month,points[6].day),y:points[6].temp},
                  {x: new Date(points[7].year,points[7].month,points[7].day),y:points[7].temp},
                  {x: new Date(points[8].year,points[8].month,points[8].day),y:points[8].temp},
                  {x: new Date(points[9].year,points[9].month,points[9].day),y:points[9].temp},
                  {x: new Date(points[10].year,points[10].month,points[10].day),y:points[10].temp},
                  {x: new Date(points[11].year,points[11].month,points[11].day),y:points[11].temp},
                  {x: new Date(points[12].year,points[12].month,points[12].day),y:points[12].temp},
                  {x: new Date(points[13].year,points[13].month,points[13].day),y:points[13].temp},
                  {x: new Date(points[14].year,points[14].month,points[14].day),y:points[14].temp}
        ]
      }]
    });
      
    chart.render(); 
    }
  }

}

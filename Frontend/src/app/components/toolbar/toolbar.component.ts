import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/event-emitter.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
current="Ciudad Obregón"
currentScale="Celsius"
  constructor(private eventEmitterService :EventEmitterService) { }

  ngOnInit() {
  }
updateGraph(data:string,op:string){
  if (op=='cd') {
    if (data!=this.current) {
      this.eventEmitterService.onUpdateGraph(data,op);
      this.current=data;   
    }  
  }
  if (op=='dg') {
    if (data!=this.currentScale) {
      this.eventEmitterService.onUpdateGraph(data,op);
      this.currentScale=data; 
      } 
  }
   
}
}

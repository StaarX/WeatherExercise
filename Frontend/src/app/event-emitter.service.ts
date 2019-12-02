import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokator=new EventEmitter();
  subsVar:Subscription;
  constructor() { }

  onUpdateGraph(data:string,op:string){
    var dat={data:data,
              op:op}
    this.invokator.emit(dat);
  }
}

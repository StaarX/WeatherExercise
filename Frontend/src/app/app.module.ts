import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';

//Modules
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './components/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Components
import { GraphComponent } from './components/graph/graph.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EventEmitterService } from './event-emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule
  ],
  providers: [FlashMessagesService,
              EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

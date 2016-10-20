import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterByPipe } from './filter.pipe';

import { AppComponent }   from './app.component';
import { PersonLocalStorageService } from './person-local-storage.service';

@NgModule({
  imports:      [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ AppComponent, FilterByPipe ],
  providers: [
    PersonLocalStorageService
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
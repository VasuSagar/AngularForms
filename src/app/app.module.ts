import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/employee/create.component';
import { ListComponent } from './components/employee/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FBcreateComponent } from './componentsFormbuilder/employee/fbcreate/fbcreate.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    FBcreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

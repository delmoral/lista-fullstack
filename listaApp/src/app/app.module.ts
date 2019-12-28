import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ProductComponent } from './models/product/product.component';
import { ResponseComponent } from './models/response/response.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProductComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

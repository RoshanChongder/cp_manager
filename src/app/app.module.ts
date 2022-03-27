import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PltformsComponent } from './platforms/pltforms.component';
import { PlatformViewComponent } from './platforms/platform-view/platform-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PltformsComponent,
    PlatformViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

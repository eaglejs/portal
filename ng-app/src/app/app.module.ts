import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent, LoginComponent, RegisterComponent } from './components';
import { httpInterceptorProviders } from './helpers/';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

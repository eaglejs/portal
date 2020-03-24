import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent, LoginComponent, RegisterComponent, UserManagementComponent, UserProfileComponent } from './components';

import { httpInterceptorProviders } from './helpers/';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AuthService } from './services/auth.service';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserProfileComponent,
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
    AuthService,
    ConfigService,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.loadConfigData(),
      deps: [ConfigService],
      multi: true
    },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

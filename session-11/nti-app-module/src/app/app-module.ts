import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { LandingPageModule } from './public/landing-page/landing-page-module';


@NgModule({
  declarations: [App],
  imports: [BrowserModule, LandingPageModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

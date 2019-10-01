import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoaderComponent
  ],
  imports: [    
  ],
  exports: [
    NavbarComponent,
    LoaderComponent
  ],
  providers: []
})
export class CoreModule { }

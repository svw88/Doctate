import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DocsComponent } from './modules/docs/docs.component';
import { AppRouting } from './app.routing';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    DocsComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouting,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

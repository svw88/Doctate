import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { ExceptionInterceptor } from '@app/core/exceptions/exceptions.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ExceptionInterceptor,
    multi: true
  },]
})
export class CoreModule { }

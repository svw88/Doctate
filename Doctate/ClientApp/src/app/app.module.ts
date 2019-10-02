import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DocsComponent } from './modules/docs/docs.component';
import { AppRouting } from './app.routing';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { WizardComponent } from '@app/modules/wizard/wizard.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { OsComponent } from '@app/modules/wizard/steps/os/os.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TroubleshootingComponent } from '@app/modules/wizard/steps/troubleshooting/troubleshooting.component';
import { SystemComponent } from '@app/modules/wizard/steps/system/system.component';
import { ServerComponent } from '@app/modules/wizard/steps/server/server.component';
import { SoftwareComponent } from '@app/modules/wizard/steps/software/software.component';

@NgModule({
  declarations: [
    AppComponent,
    DocsComponent,
    HomeComponent,
    AboutComponent,
    WizardComponent,
    OsComponent,
    TroubleshootingComponent,
    SystemComponent,
    ServerComponent,
    SoftwareComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouting,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WizardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

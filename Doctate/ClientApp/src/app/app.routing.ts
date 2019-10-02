import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocsComponent } from './modules/docs/docs.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { WizardComponent } from '@app/modules/wizard/wizard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'docs',
        component: DocsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'wizard/:name',
        component: WizardComponent
      }
    ]
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {
}

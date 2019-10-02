import { Component } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './wizard.component.html'
})
export class WizardComponent {
  constructor(public wizardService: WizardService, public router: Router) {
    wizardService.currentStep = 1;
  }

  step(number: number) {
    let index = this.wizardService.currentStep + number;
    if (index < 6 && index > 0) {
      this.wizardService.navigateTo(index);
    }
   
  }

  save() {
    this.router.navigate(['docs']);
  }
}

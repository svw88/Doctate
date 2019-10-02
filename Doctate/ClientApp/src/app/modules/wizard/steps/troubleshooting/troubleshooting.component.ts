import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-troubleshooting",
  templateUrl: './troubleshooting.component.html'
})
export class TroubleshootingComponent extends BaseComponent {


  constructor(wizardService: WizardService) {
    super(wizardService);
    this.form = new FormGroup({
      troubleshooting: new FormControl('')
    })

    this.wizardService.addStep(this.formSubject, "troubleshooting");
  }


}

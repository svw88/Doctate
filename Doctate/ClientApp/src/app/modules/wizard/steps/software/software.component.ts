import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-software",
  templateUrl: './software.component.html'
})
export class SoftwareComponent extends BaseComponent {


  constructor(wizardService: WizardService) {
    super(wizardService);
    this.form = new FormGroup({
      software: new FormControl([])
    })

    this.wizardService.addStep(this.formSubject, "software");
  }


}

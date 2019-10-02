import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-system",
  templateUrl: './system.component.html'
})
export class SystemComponent extends BaseComponent {


  constructor(wizardService: WizardService) {
    super(wizardService);
    this.form = new FormGroup({
      instructions: new FormControl([])
    })

    this.wizardService.addStep(this.formSubject, "system");
  }


}

import { Component, Input } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { FormGroup } from '@angular/forms';

@Component({

})
export class BaseComponent {
  form: FormGroup;
  @Input() index: number;

  constructor(public wizardService: WizardService, form: FormGroup, name: string) {
    if (this.wizardService.steps.find(x => x.Name == name)) {
      this.form = this.wizardService.steps.find(x => x.Name == name).Form;
    } else {
      this.wizardService.addStep(form, name);
      this.form = form;
    }

   
  }

}
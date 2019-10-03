import { Input } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { FormGroup } from '@angular/forms';

export class BaseComponent {
  public form: FormGroup;
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

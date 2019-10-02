import { Component, Input } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({

})
export class BaseComponent {
  form: FormGroup;
  @Input() Index: number;
  formSubject: BehaviorSubject<FormGroup>

  constructor(public wizardService: WizardService) {

    this.wizardService.navigate.subscribe(() => {
      if (this.wizardService.currentStep == this.Index) {
        this.formSubject.next(this.form)
      }
    });
  }

}

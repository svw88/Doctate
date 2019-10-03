import { Component } from '@angular/core';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-software",
  templateUrl: './software.component.html'
})
export class SoftwareComponent extends BaseComponent {


  constructor(wizardService: WizardService, public formbuilder: FormBuilder) {
    super(wizardService, formbuilder.group({
      software: formbuilder.array([

      ])
    }), "software");

  }

  addSoftware(software: AbstractControl) {
    
    (software as FormArray).push(this.formbuilder.group({
      software: ''
    }));
  }

  removeFeature(software: AbstractControl, index: number) {

    (software as FormArray).removeAt(index);
  }


}

import { Component } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
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

  addSoftware(software: FormArray) {

    software.push(this.formbuilder.group({
      software: ''
    }));
  }

  removeFeature(software: FormArray, index: number) {

    software.removeAt(index);
  }


}

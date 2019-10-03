import { Component } from '@angular/core';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-os",
  templateUrl: './os.component.html'
})
export class OsComponent extends BaseComponent {


  constructor(wizardService: WizardService, public formbuilder: FormBuilder) {

    super(wizardService, formbuilder.group({
      operatingSystem: '',
      features: formbuilder.array([
        
      ]),
    }), 'os');


  }

  addFeature(features: AbstractControl) {

    (features as FormArray).push(this.formbuilder.group({
      mainFeature: '',
      subFeatures: this.formbuilder.array([
      ])
    }));
  }

  addSubFeature(features: AbstractControl) {

    (features as FormArray).push(this.formbuilder.group({
      subFeature: ''
    }));
  }

  removeFeature(features: AbstractControl, index: number) {

    (features as FormArray).removeAt(index);
  }

}

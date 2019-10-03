import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-system",
  templateUrl: './system.component.html'
})
export class SystemComponent extends BaseComponent {


  constructor(wizardService: WizardService, formbuilder: FormBuilder) {
    super(wizardService, formbuilder.group({
      instructions: ''
    }), "system");  
  }


}

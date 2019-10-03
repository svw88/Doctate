import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-server",
  templateUrl: './server.component.html'
})
export class ServerComponent extends BaseComponent {


  constructor(wizardService: WizardService, formbuilder: FormBuilder) {
    super(wizardService, formbuilder.group({
      type: '',
      cpu: '',
      memory: '',
      disk: ''
    }), "server");
  }


}

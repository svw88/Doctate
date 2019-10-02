import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-server",
  templateUrl: './server.component.html'
})
export class ServerComponent extends BaseComponent {


  constructor(wizardService: WizardService) {
    super(wizardService, new FormGroup({
      cpu: new FormControl(''),
      memory: new FormControl(''),
      disk: new FormControl('')
    }), "server");
  }


}

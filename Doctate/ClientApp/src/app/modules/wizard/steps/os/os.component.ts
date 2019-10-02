import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from '@app/modules/wizard/steps/base/base.component';
import { WizardService } from '@app/modules/wizard/services/wizard.service';

@Component({
  selector: "app-step-os",
  templateUrl: './os.component.html'
})
export class OsComponent extends BaseComponent {


  constructor(wizardService: WizardService) {
    super(wizardService, new FormGroup({
      operatingSystem: new FormControl(''),
      features: new FormControl(''),
    }), 'os');
    
    
  }


}

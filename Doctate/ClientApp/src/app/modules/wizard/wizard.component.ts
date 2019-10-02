import { Component, OnInit } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DocumentObject } from '@app/modules/wizard/interfaces/document.interface';

@Component({
  templateUrl: './wizard.component.html'
})
export class WizardComponent implements OnInit {

  documentName: string = '';
  document: DocumentObject = {} as DocumentObject;

  constructor(
    public wizardService: WizardService,
    public router: Router,
    public route: ActivatedRoute,
    public httpClient: HttpClient) {
    wizardService.currentStep = 1;
  }

  init(): void {
    if (this.wizardService.steps.length < 1) {
      setTimeout(() => this.init(), 500);
    } else {
      this.httpClient.get(`api/DocumentData/GetDocument?name=${this.documentName}`).subscribe((doc: DocumentObject) => {


        this.wizardService.steps.find(x => x.Name == 'os').Form.get('operatingSystem').valueChanges.subscribe(x => this.document.OperatingSystem = x);
        this.wizardService.steps.find(x => x.Name == 'os').Form.get('features').valueChanges.subscribe(x => this.document.Features = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('cpu').valueChanges.subscribe(x => this.document.Cpu = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('memory').valueChanges.subscribe(x => this.document.Memory = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('disk').valueChanges.subscribe(x => this.document.Disk = x);
        this.wizardService.steps.find(x => x.Name == 'system').Form.get('instructions').valueChanges.subscribe(x => this.document.Instructions = x);
        this.wizardService.steps.find(x => x.Name == 'software').Form.get('software').valueChanges.subscribe(x => this.document.Software = x);
        this.wizardService.steps.find(x => x.Name == 'troubleshooting').Form.get('debugging').valueChanges.subscribe(x => this.document.Debugging = x);

        if (doc) {
          this.wizardService.steps.find(x => x.Name == 'os').Form.get('operatingSystem').setValue(doc.OperatingSystem);
          this.wizardService.steps.find(x => x.Name == 'os').Form.get('features').setValue(doc.Features);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('cpu').setValue(doc.Cpu);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('memory').setValue(doc.Memory);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('disk').setValue(doc.Disk);
          this.wizardService.steps.find(x => x.Name == 'system').Form.get('instructions').setValue(doc.Instructions);
          this.wizardService.steps.find(x => x.Name == 'software').Form.get('software').setValue(doc.Software);
          this.wizardService.steps.find(x => x.Name == 'troubleshooting').Form.get('debugging').setValue(doc.Debugging);

        }

      });
    }


  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      this.documentName = x.get('name');
    });

    this.init();

  }

  step(number: number) {
    let index = this.wizardService.currentStep + number;
    if (index < 6 && index > 0) {
      this.wizardService.navigateTo(index);
    }
  }

  stepTo(number: number) {
    if (number < 6 && number > 0) {
      this.wizardService.navigateTo(number);
    }
  }


  save() {

    this.httpClient.post(`api/DocumentData/UpdateDocument?name=${this.documentName}`, this.document).subscribe(() => {
      this.wizardService.steps.forEach(x => x.Form.reset());
      this.router.navigate(['docs']);
    });

  }


}


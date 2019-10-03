import { Component, OnInit } from '@angular/core';
import { WizardService } from '@app/modules/wizard/services/wizard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DocumentObject } from '@app/modules/wizard/interfaces/document.interface';
import { FormArray, FormBuilder } from '@angular/forms';
import { Feature } from '@app/modules/wizard/interfaces/feature.interface';
import { Software } from '@app/modules/wizard/interfaces/software.interface';

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
    public httpClient: HttpClient,
    public formBuilder: FormBuilder) {
    wizardService.currentStep = 1;
  }

  init(): void {
    if (this.wizardService.steps.length < 1) {
      setTimeout(() => this.init(), 500);
    } else {
      this.httpClient.get(`api/DocumentData/GetDocument?name=${this.documentName}`).subscribe((doc: DocumentObject) => {


        this.wizardService.steps.find(x => x.Name == 'os').Form.get('operatingSystem').valueChanges.subscribe(x => this.document.OperatingSystem = x);
        this.wizardService.steps.find(x => x.Name == 'os').Form.get('features').valueChanges.subscribe(x => this.document.Features = x.map(s => {
          return {
            Feature: s.mainFeature,
            SubFeatures: s.subFeatures.map(d =>
            {
              return { Feature: d.subFeature } as Feature
            })
          } as Feature
        }));
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('type').valueChanges.subscribe(x => this.document.Type = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('cpu').valueChanges.subscribe(x => this.document.Cpu = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('memory').valueChanges.subscribe(x => this.document.Memory = x);
        this.wizardService.steps.find(x => x.Name == 'server').Form.get('disk').valueChanges.subscribe(x => this.document.Disk = x);
        this.wizardService.steps.find(x => x.Name == 'system').Form.get('instructions').valueChanges.subscribe(x => this.document.Instructions = x);
        this.wizardService.steps.find(x => x.Name == 'software').Form.get('software').valueChanges.subscribe(x => this.document.Software = x);
        this.wizardService.steps.find(x => x.Name == 'software').Form.get('software').valueChanges.subscribe(x => this.document.Software = x.map(s => {
          return {
            Software: s.software
          } as Software
        }));
        this.wizardService.steps.find(x => x.Name == 'troubleshooting').Form.get('debugging').valueChanges.subscribe(x => this.document.Debugging = x);

        if (doc) {
          this.wizardService.steps.find(x => x.Name == 'os').Form.get('operatingSystem').setValue(doc.OperatingSystem);

          doc.Features.forEach(x =>
          {
            let features = this.wizardService.steps.find(x => x.Name == 'os').Form.get('features') as FormArray;
            let group = this.formBuilder.group(
              {
                mainFeature: x.Feature,
                subFeatures: this.formBuilder.array([])
              });

            let subfeatures = group.get('subFeatures') as FormArray;

            x.SubFeatures.forEach(s =>
            {
              subfeatures.push(this.formBuilder.group(
                {
                  subFeature: s.Feature
                }));
            });
            
            features.push(group);
          });

         
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('type').setValue(doc.Type);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('cpu').setValue(doc.Cpu);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('memory').setValue(doc.Memory);
          this.wizardService.steps.find(x => x.Name == 'server').Form.get('disk').setValue(doc.Disk);
          this.wizardService.steps.find(x => x.Name == 'system').Form.get('instructions').setValue(doc.Instructions);

          doc.Software.forEach(x => {
            let software = this.wizardService.steps.find(x => x.Name == 'software').Form.get('software') as FormArray;
            let group = this.formBuilder.group(
              {
                software: x.Software
              });

            software.push(group);
          });

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

  close() {
    this.wizardService.steps.forEach(x => x.Form.reset());
    let features = this.wizardService.steps.find(x => x.Name == 'os').Form.get('features') as FormArray;
    features.clear();

    let software = this.wizardService.steps.find(x => x.Name == 'software').Form.get('software') as FormArray;
    software.clear();

    this.router.navigate(['docs']);
  }

  save() {

    this.httpClient.post(`api/DocumentData/UpdateDocument?name=${this.documentName}`, this.document).subscribe(() => {
      this.close();
    });

  }


}


import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceForm } from '@app/modules/wizard/interfaces/service-form.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WizardService {

  public steps: ServiceForm[] = [];

  public currentStep: number;

  public navigate: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.navigate.subscribe(x => this.currentStep = x);
  }

  public addStep(form: FormGroup, name: string) {
    this.steps.push({ Name: name, Form: form })
  }


  public navigateTo(index: number) {
    this.navigate.emit(index);
  }



}

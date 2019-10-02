import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServiceForm } from '@app/modules/wizard/interfaces/service-form.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WizardService {

  private steps: ServiceForm[] = [];

  public currentStep: number;

  private navigate: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.navigate.subscribe(x => this.currentStep = x);
  }

  public addStep(formSubject: BehaviorSubject<FormGroup>, name: string) {
    this.steps.push({ Name: name, Subject: formSubject })
  }

  public stepSubject(name: string): BehaviorSubject<FormGroup> {
    return this.steps.find(x => x.Name == name).Subject;
  }

  public navigateTo(index: number) {
    this.navigate.emit(index);
  }

}

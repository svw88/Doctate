import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';

export interface ServiceForm {
  Subject: BehaviorSubject<FormGroup>,
  Name: string
}

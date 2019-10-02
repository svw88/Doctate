import { NgModule } from '@angular/core';

import { ModalComponent } from '@app/common/modal/modal.component';
import { ModalService } from '@app/common/modal/modal.service';

@NgModule({
  declarations: [
    ModalComponent
    
  ],
  imports: [
    
  ],
  exports: [
    ModalComponent
  ],
  providers: [ModalService]
})
export class ModalModule { }

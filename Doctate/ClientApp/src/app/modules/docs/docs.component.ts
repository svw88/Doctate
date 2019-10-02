import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '@interfaces/documentInfo';
import { Router } from '@angular/router';
import { ModalService } from '@app/common/modal/modal.service';

@Component({
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {

  bodyText: string = '';
  public documentList: DocumentInfo[] = [];
  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public modalService: ModalService) {

  }

  getDocumentList(): void {
    this.httpClient.get<DocumentInfo[]>("api/DocumentData/DocumentList").subscribe((x: DocumentInfo[]) => {
      this.documentList = x;
    });
  }

  editDocument(name: string): void {

    if (name) {
      this.router.navigate(['wizard', name]);
    } else {
      this.modalService.open('newDoc');
    }

  }

  ngOnInit(): void {
    this.getDocumentList();
  }

  closeModal() {
    this.httpClient.get("api/DocumentData/CreateDocument?name=" + this.bodyText).subscribe(() => {
      this.modalService.close('newDoc');
      this.router.navigate(['wizard', this.bodyText]);
      this.bodyText = '';
    });

  }


  deleteDocument(name: string) {
    this.httpClient.get(`api/DocumentData/DeleteDocument?name=${name}`).subscribe(() => {
      this.documentList.splice(this.documentList.findIndex(x => x.Name == name), 1);
    });
  }
}

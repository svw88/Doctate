import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '@interfaces/documentInfo';

@Component({
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {


  public documentList: DocumentInfo[] = [];
  constructor(public httpClient: HttpClient) {

  }

  getDocumentList(): void {
    this.httpClient.get<DocumentInfo[]>("api/DocumentData/DocumentList").subscribe((x: DocumentInfo[]) => {
      this.documentList = x;
    });
  }

  ngOnInit(): void {
    this.getDocumentList();
  }
}

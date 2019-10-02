import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '@interfaces/documentInfo';
import { Router } from '@angular/router';

@Component({
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {


  public documentList: DocumentInfo[] = [];
  constructor(public httpClient: HttpClient, public router: Router) {

  }

  getDocumentList(): void {
    this.httpClient.get<DocumentInfo[]>("api/DocumentData/DocumentList").subscribe((x: DocumentInfo[]) => {
      this.documentList = x;
    });
  }

  editDocument(name: string): void {
    this.router.navigate(['wizard', name]);
  }

  ngOnInit(): void {
    this.getDocumentList();
  }
}

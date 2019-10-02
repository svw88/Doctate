import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInfo } from '@interfaces/documentInfo';
import { Router } from '@angular/router';
import { ModalService } from '@app/common/modal/modal.service';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { DocumentObject } from '@app/modules/wizard/interfaces/document.interface';

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

  print(name: string) {
    this.httpClient.get(`api/DocumentData/GetDocument?name=${name}`).subscribe((x: DocumentObject) => {
      let el = document.createElement("div");
      el.style.position = 'absolute';
      el.style.right = '100vw';
      el.style.width = '100%';

      el.innerHTML = `
                      <b>${name}</b>
                      </br>
                      </br>
                      <b>Cpu</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Cpu}</p>
                      </br>
                      <b>Memory</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Memory}</p>
                      </br>
                      <b>Disk</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Disk}</p>
                      </br>
                      <b>Operating System</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.OperatingSystem}</p>
                      </br>
                      <b>Features</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Features}</p>
                      </br>
                      <b>Software</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Software}</p>
                      </br>
                      <b>Instructions</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Instructions}</p>
                      </br>
                      <b>Debugging</b>
                      <p style="max-width: 700px;word-break: break-all;">${x.Debugging}</p>
                      </br>
                     `;

      document.getElementsByTagName('BODY')[0].append(el);
      html2canvas.default(el).then((canvas) => {
        el.remove();
        var imgData = canvas.toDataURL(
          'image/png');

        var doc = new jspdf('p', 'mm');
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save(name);
      }

      );
    });

  }
}

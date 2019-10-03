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
                      <div>
                        <div style="display: inline-block; width: 25%;">
                          <b>Type</b>
                          <p style="max-width: 600px;word-break: break-all;">${x.Type}</p>
                          </div>
                          <div style="display: inline-block; width: 25%;">
                          <b>Cpu</b>
                          <p style="max-width: 600px;word-break: break-all;">${x.Cpu}</p>
                        </div>
                      </div>
                      </br>
                      <div>
                        <div style="display: inline-block; width: 25%;">
                        <b>Memory</b>
                        <p style="max-width: 600px;word-break: break-all;">${x.Memory}</p>
                        </div>
                        <div style="display: inline-block; width: 25%;">
                        <b>Disk</b>
                        <p style="max-width: 600px;word-break: break-all;">${x.Disk}</p>
                        </div>
                      </div>
                      </br>
                      <b>Operating System</b>
                      <p style="max-width: 600px;word-break: break-all;">${x.OperatingSystem}</p>
                      </br>
                      <b>Features</b>
                      ${x.Features.map(a => `
                        <p style="max-width: 600px;word-break: break-all;">[${a.Feature}]: ${a.SubFeatures.map(s => ` ${s.Feature}`).join(',')}</p>       
                      `).join('')}
                      </br>
                      <b>Software</b>
                      <p style="max-width: 600px;word-break: break-all;">
                        ${x.Software.map(s => s.Software).join(', ')}
                      </p>
                      </br>
                      <b>Instructions</b>
                      ${x.Instructions.split('\n').map(x => `<p style="max-width: 600px;word-break: break-all;">${x}</p>`).join('')}
                      </br>
                      <b>Debugging</b>
                      ${x.Debugging.split('\n').map(x => `<p style="max-width: 600px;word-break: break-all;">${x}</p>`).join('')}
                      </br>
                     `;

      document.getElementsByTagName('BODY')[0].append(el);
      html2canvas.default(el).then((canvas) => {
        el.remove();
        var imgData = canvas.toDataURL(
          'image/png');

        var doc = new jspdf('p', 'mm', 'a4');
        doc.addImage(imgData, 'PNG', 10, 10, 0, 290);
        doc.save(name);
      }

      );
    });

  }
}

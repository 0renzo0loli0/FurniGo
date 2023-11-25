import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-view-control',
  templateUrl: './order-view-control.component.html',
  styleUrls: ['./order-view-control.component.css']
})
export class OrderViewControlComponent implements OnChanges {

  @Input() orderID: number = -1;
  @Input() objName: string = "archivo.fbx";
  @Input() file: File | null = null;
  url: string = "";

  constructor(private http: HttpClient) { }

  onDownload = (event: Event) => {
    const a = document.createElement('a');
    a.href = this.url;
    a.download = this.objName;
    a.click();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["orderID"]) {
      const nUrl = environment.basePath + "/design/" + this.orderID;
      this.fetchFromDesign(nUrl).subscribe({
        next: data => {
            const binaryData: Uint8Array = data;
            const blob = new Blob([binaryData], {type: "application/octet-stream"})
            this.url = URL.createObjectURL(blob);
          },
        error: (err: Error) => {
          console.error(err)
        }
      })
    }

    if (changes["file"] && this.file != null) {
      this.url = URL.createObjectURL(this.file);
      this.objName = this.file.name;
    }
  }

  fetchFromDesign(path: string): Observable<any> {
    return this.http.get(path, {
      withCredentials: true,
      headers: {
        "Authorization": "Bearer " + AuthUtils.getToken() ?? ""
      }
    })
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-view-control',
  templateUrl: './order-view-control.component.html',
  styleUrls: ['./order-view-control.component.css']
})
export class OrderViewControlComponent {

  @Input() objPath = ""

  onDownload = (event: Event)=>{
    window.open(this.objPath)
  }
}

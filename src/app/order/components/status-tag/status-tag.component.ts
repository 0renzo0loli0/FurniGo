import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderStatus } from '../../model/order_state.enum';

type StatusFill = {
  status: string, 
  color: string
}

const STATUS_DATA: {[key: string]: StatusFill} = {
  [OrderStatus.INLINE]: {status: 'En Cola', color: '#675F30'},
  [OrderStatus.BUILDING]: {status: 'En Fabricacion', color: '#EFE3A8'},
  [OrderStatus.FINISHED]: {status: 'Finalizando', color: '#BA1A1A'},
  [OrderStatus.DONE]: {status: 'Hecho', color: '#FFB597'},
  [OrderStatus.CANCELLED]: {status: 'Cancelado', color: '#FF0000'}
};

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.css']
})
export class StatusTagComponent  implements OnChanges{
  @Input() status: OrderStatus = OrderStatus.BUILDING;
  currentOptions = STATUS_DATA[this.status];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['status']){
      this.currentOptions = STATUS_DATA[this.status];
    }
  }
}

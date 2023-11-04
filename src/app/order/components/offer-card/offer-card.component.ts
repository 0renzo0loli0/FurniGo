import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent {
  @Input() title: string = "Unknown";
  @Input() price: number = 0;
  @Input() limit: Date = new Date();
  @Input() pic: string = "";
}

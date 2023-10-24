import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.css']
})
export class UserTagComponent {
  @Input() name = 'Unknown'
  @Input() pic = 'https://i.pinimg.com/736x/87/67/64/8767644bc68a14c50addf8cb2de8c59e.jpg'
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.css']
})
export class UserTagComponent {
  @Input() name = 'Unknown'
  @Input() pic = ''
}

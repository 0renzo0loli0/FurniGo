import { Component } from '@angular/core';
import { AuthUtils } from 'src/app/shared/utils/auth.utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  get currentUser() { return AuthUtils.getCurrentUser() }
}

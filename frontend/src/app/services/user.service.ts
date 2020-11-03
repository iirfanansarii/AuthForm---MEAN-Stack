import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private webRequestService: WebRequestService) {}

  signUp(user: User) {
    return this.webRequestService.post('users', { user });
  }

  signIn(user: User) {
    return this.webRequestService.post('users/sign-in', { user });
  }

}

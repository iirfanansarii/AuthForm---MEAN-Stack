import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css'],
})
export class SiginComponent implements OnInit {
  err: String;
  message: String;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  signIn(e: Event, email: String, password: String) {
    e.preventDefault();
    this.err = "";
    this.message = "";
    /*

      "response": {
        "status" : true,
        "result": data,
        "message": "registered"
      }
      */
    if (email && password) {
      let user = new User();
      user.email = email;
      user.password = password;
      this.userService.signIn(user).subscribe((response: any) => {
        if (response) {
          if (response.status) {
            //user registered....
            this.message = response.message;
          } else {
            this.err = response.message;
          }
        } else {
          this.err = 'Oops! something went wrong. please try again';
        }
      });
    } else {
      this.err = 'All fields are required!';
    }
  }
}

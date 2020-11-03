import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  err: String;
  message: String;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.err = '';
    this.message = '';
  }

  signUp(e: Event, name: String, email: String, password: String) {
    e.preventDefault();
    console.log(name, email);
    this.err = '';
    this.message = '';
    //store into backend
    if (name && email && password) {
      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      /*

      "response": {
        "status" : true,
        "result": data,
        "message": "registered"
      }
      */

      this.userService.signUp(user).subscribe((response: any) => {
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
      this.err = "All fields are required!";
    }
  }
}

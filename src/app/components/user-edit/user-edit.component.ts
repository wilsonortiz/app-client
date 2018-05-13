import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService]
  //  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;

  constructor(private userService: UserService) {
    this.title = "Actualizar mis datos";
  }

  ngOnInit() {
    this.identity = this.userService.getidentity();
    this.token = this.userService.getToken();
  }

}

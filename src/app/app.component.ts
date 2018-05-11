import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'music';
  public user: User;
  public identity;
  public token;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    var texto = this.userService.sigup();
    console.log(texto);
  }

  //metodo que se carga cuando pulsamos el botón "Entrar"
  public onSumbit() {
    console.log(this.user);
  }
}

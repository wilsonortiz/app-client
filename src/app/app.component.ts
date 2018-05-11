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
  public loginError;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {

  }

  //metodo que se carga cuando pulsamos el botón "Entrar"
  public onSumbit() {
    this.userService.sigup(this.user).subscribe(res => {
      this.loginError = "";

      let identity = res.user;
      this.identity = identity;

      if (!this.identity._id) {
        alert("El usuario no esta correctamente logueado");

      } else {
        //Session el localStorage para guardarlo
        this.userService.sigup(this.user, 'true').subscribe(res => {
          this.loginError = "";

          let token = res.token;
          this.token = token;

          if (this.token.length <= 0) {
            alert("El token no se ha generado correctamente");

          } else {
            console.log(token);
            console.log(identity);
          }

        },
          err => {
            let messageError = <any>err;

            if (messageError != null) {
              let body = JSON.parse(err._body);
              this.loginError = body.message;
            }
          });
      }

    },
      err => {
        let messageError = <any>err;

        if (messageError != null) {
          let body = JSON.parse(err._body);
          this.loginError = body.message;
        }
      });
  }
}

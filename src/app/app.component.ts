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
  public userRegister: User;
  public identity;
  public token;
  public loginError;
  public registerMessage;

  constructor(private userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  public ngOnInit() {
    this.identity = this.userService.getidentity();
    this.token = this.userService.getToken();

    console.log(this.identity);
    console.log(this.token);
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
        localStorage.setItem('identity', JSON.stringify(identity));

        //get token
        this.userService.sigup(this.user, 'true').subscribe(res => {
          this.loginError = "";

          let token = res.token;
          this.token = token;

          if (this.token.length <= 0) {
            alert("El token no se ha generado correctamente");

          } else {

            localStorage.setItem('token', token);
            this.user = new User('', '', '', '', '', 'ROLE_USER', '');
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

  public onSumbitRegister() {
    console.log(this.userRegister);

    this.userService.register(this.userRegister).subscribe(
      res => {

        let user = res.user;
        this.userRegister = user;

        if (!user._id) {
          this.registerMessage = "Error al registrarse";

        } else {
          this.registerMessage = "El registro se ha realizado correctamente, identificate con " + this.userRegister.email;
          this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
        }
      },
      err => {
        let messageError = <any>err;

        if (messageError != null) {
          let body = JSON.parse(err._body);
          this.registerMessage = body.message;
        }
      });
  }

  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
}

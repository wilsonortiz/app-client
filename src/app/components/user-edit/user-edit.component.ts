import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

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
  public messageAlert;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(private userService: UserService) {
    this.title = 'Actualizar mis datos';
    //get of localStorage
    this.identity = this.userService.getidentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {


  }

  public onUpdateUser() {
    this.userService.updateUser(this.user).subscribe(
      res => {
        if (!res.user) {
          this.messageAlert = 'El usuario no se ha actualizado';
        }
        else {
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById("nameLogued").innerHTML = this.user.name;

          if (!this.filesToUpload) {
            //Redirect
          } else {
            this.makeFilesRequest(this.url + 'upload-image/' + this.user._id, [], this.filesToUpload)
              .then(
                (result: any) => {
                  this.user.image = result.image;
                  localStorage.setItem('identity', JSON.stringify(this.user));
                  let imagePath = this.url + 'get-image-user/' + this.user.image;
                  document.getElementById("imageLogued").setAttribute('src', imagePath);
                }
              ).catch(e => {
                console.log(e);
              });
          }
          this.messageAlert = 'El usuario se ha actualizado correctamente';
        }

      },
      err => {
        let messageError = <any>err;

        if (messageError != null) {
          let body = JSON.parse(err._body);
          this.messageAlert = body.message;
        }
      });

  }

  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  public makeFilesRequest(url: string, params: Array<string>, files: Array<File>) {
    let token = this.token;

    return new Promise(function(resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));

          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}

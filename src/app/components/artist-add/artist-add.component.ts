import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';


import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';

@Component({
	selector: 'app-artist-add',
	templateUrl: './artist-add.component.html',
	providers:[UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {
	public title:string;
	public artist :Artist;
	public identity;
	public token;
	public url:string;
	public alertMessage:string;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService : ArtistService
		){

		this.title ='Crear nuevo artista';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('','','')
	}


	ngOnInit() {

	}

	public onSubmit(){
		this.artistService.addArtist(this.token, this.artist).subscribe(
			res=>{

				if(!res.artist){
					this.alertMessage='Error en el servidor';

				}else{
					this.alertMessage='El artista se ha creado correctamente';
					this.artist= res.artist;
					//this.router.navigate(['/editar-artista'], res.artist._id);
				}

			},
			err =>{
				var errorMessage = <any>err;

				if(errorMessage!=null){
					var body = JSON.parse(err._body);
					this.alertMessage= body.message;
					console.log(err);
				}
			}
			);
	}

}

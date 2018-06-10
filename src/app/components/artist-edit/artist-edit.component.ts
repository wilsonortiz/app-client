import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';

import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';

@Component({
	selector: 'app-artist-edit',
	templateUrl: '../artist-add/artist-add.component.html',
	providers:[UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {
	public title:string;
	public artist :Artist;
	public identity;
	public token;
	public url:string;
	public alertMessage:string;
	public is_edit;
	public filesToUpload:Array<File>;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService : ArtistService,
		private uploadService: UploadService
		){

		this.title ='Editar artista';
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('','','');
		this.is_edit=true;
	}


	ngOnInit() {
		this.getArtist();
	}

	public onSubmit(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];

			this.artistService.updateArtist(this.token, id, this.artist).subscribe(
				res => {

					if(!res.artist){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El artista se ha actualizado correctamente!';

						if(!this.filesToUpload){
							this.router.navigate(['/artista', res.artist._id]);

						}else{
					//Subir imagen del artista
					this.uploadService.makeFilesRequest(this.url+'upload-image-artist/'+id, [], this.filesToUpload, this.token, 'image')
					.then(
						(result) =>{
							this.router.navigate(['/artista', res.artist._id]);
						},
						(err) =>{
							console.log(err);
						}
						);
				}
			}

		},
		err => {
			var errorMessage = <any>err;

			if(errorMessage != null){
				var body = JSON.parse(err._body);
				this.alertMessage = body.message;
				console.log(err);
			}
		}	
		);
		});
	}

	public getArtist(){
		this.route.params.forEach((params:Params)=>{
			let id= params['id'];

			this.artistService.getArtist(this.token,id).subscribe(
				res=>{
					
					if(!res.artist){
						this.router.navigate(['/']);

					}else{
						this.artist= res.artist;
					}

				},
				err =>{
					var errorMessage = <any>err;

					if(errorMessage!=null){
						var body = JSON.parse(err._body);
						//this.alertMessage= body.message;
						console.log(err);
					}
				}

				);
		});
	}

	fileChangeEvent(fileInput:any){
		this.filesToUpload=<Array<File>>fileInput.target.files;
	}

}

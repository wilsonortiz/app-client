import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';

import { ArtistService } from '../../services/artist.service';

@Component({
	selector: 'app-artist-list',
	templateUrl: './artist-list.component.html',
	providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit {
	public title :string;
	public artists :Artist[];
	public identity;
	public token;
	public url:string;
	public next_page;
	public prev_page;
	public confirmado;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService: ArtistService
		){

		this.title='Artistas'
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page =1;

	}

	ngOnInit() {
		console.log('artist-list-component cargado');
		this.getArtists();
		//Cargar el listado de artistas cuando se inicie la pagina
	}

	public getArtists(){
		this.route.params.forEach((params:Params) =>{
			let page = +params['page'];

			if(!page){
				page = 1;

			}else{
				this.next_page = page+1;
				this.prev_page = page-1;

				if(this.prev_page==0){
					this.prev_page=1;
				}
			}

			this.artistService.getArtists(this.token,page).subscribe(
				res=>{
					if(!res.artist){
						this.router.navigate(['/'])

					}else{
						this.artists = res.artist;
					}
				},
				err =>{
					var errorMessage = <any>err;

					if(errorMessage!=null){
						var body = JSON.parse(err._body);
						console.log(err);
					}
				}
				);
		});
	}


	public onDeleteConfirm(id){
		this.confirmado= id;

	}

	public onDeleteCancel(){
		this.confirmado = null;

	}

	public onDeleteArtist(id){
		this.artistService.deleteArtist(this.token, id).subscribe(
			res=>{
				if(!res.artist){
					alert('Error en el servidor');

				}

				this.getArtists();
			},
			err =>{
				var errorMessage = <any>err;

				if(errorMessage!=null){
					var body = JSON.parse(err._body);
					console.log(err);
				}
			}
			);
	}
}
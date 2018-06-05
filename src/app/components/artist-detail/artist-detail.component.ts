import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';
import { GLOBAL } from '../../services/global';

import { ArtistService } from '../../services/artist.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-artist-detail',
	templateUrl: './artist-detail.component.html',
	provider:[UserService, ArtistService]
})
export class ArtistDetailComponent implements OnInit {
	public artist :Artist;
	public identity;
	public token;
	public url:string;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private userService : UserService,
		private artistService: ArtistService
		){
		this.identity = this.userService.getidentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit() {
		this.getArtist();
	}

	public getArtist(){
		this.route.params.forEach((params:Params)=>{
			let id= params['id'];
			console.log('id: '+id);

			this.artistService.getArtist(this.token,id).subscribe(
				res=>{
					
					if(!res.artist){
						this.router.navigate(['/']);

					}else{
						this.artist= res.artist;

						//Sacar los albun del artista
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
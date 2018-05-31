import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { GLOBAL } from './global';

import { Artist } from '../models/artist';

@Injectable({
	providedIn: 'root'
})
export class ArtistService {
	public url:string;

	constructor(private http:Http) {
		this.url = GLOBAL.url;
	}

	public getArtists(token,page){

		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers:headers});

		return this.http.get(this.url+'artists/'+ page,options).
		pipe(map((res:Response) =>res.json()));

	}


	public getArtist(token,id:string){

		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers:headers});

		return this.http.get(this.url+'artist/'+id,options).
		pipe(map((res:Response) =>res.json()));

	}

	public addArtist(token, artist:Artist){
		let body = JSON.stringify(artist);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});


		return this.http.post(this.url+'artist', body, options).
		pipe(map((res:Response) => res.json()));
	}


	public updateArtist(token,id:string, artist:Artist){
		let body = JSON.stringify(artist);
		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});
		let options = new RequestOptions({headers:headers});


		return this.http.put(this.url+'artist/'+id, body, options).
		pipe(map((res:Response) => res.json()));
	}

	public deleteArtist(token,id:string){

		let headers = new Headers({   
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers:headers});

		return this.http.delete(this.url+'artist/'+id,options).
		pipe(map((res:Response) =>res.json()));

	}
}

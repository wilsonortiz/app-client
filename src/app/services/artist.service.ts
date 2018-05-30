import { Injectable } from '@angular/core';
import { Http, Response,Headers,Request, RequestOptions } from '@angular/http';

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
}

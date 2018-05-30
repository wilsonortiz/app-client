import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
	public title:string;

	constructor() { }

	ngOnInit() {
	}

}

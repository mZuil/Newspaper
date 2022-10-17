import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { Article } from '../interfaces/Article';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
	selector: 'app-modification-article',
	templateUrl: './modification-article.component.html',
	styleUrls: ['./modification-article.component.css']
})
export class ModificationArticleComponent implements OnInit {

	@ViewChild('articleForm') articleForm: any;
	article: Article;
	id: number;
	imageError?: string | null;
	isImageSaved?: boolean;
	cardImageBase64?: string;

	constructor(private location: Location, private newsService: NewsService, private route: ActivatedRoute) {
		this.article = {} as Article;
		const idStr = this.route.snapshot.paramMap.get('id');
		if (idStr != null) {
			this.id = Number.parseInt(idStr);
		} else {
			this.id = -1;
		}
	}

	ngOnInit(): void {
		//If the parameter of the id is different than -1, we have to search the article
		var id = this.route.snapshot.paramMap.get('id');
		if (id != undefined && id != "-1") {
			this.newsService.getArticle(Number.parseInt(id)).subscribe(articleReturned => this.article = articleReturned);
		}
	}

	sendForm(): void {
		this.addArticle();
		window.alert("Tha article has been submitted correctly");
		this.goBack();
	}

	addArticle(): void {
		const newArticle = this.article;
		if(this.id == -1){
			this.newsService.createArticle(newArticle).subscribe();
		} else {
			this.newsService.updateArticle(newArticle).subscribe();
		}
	}

	fileChangeEvent(fileInput: any) {
		this.imageError = null;
		if (fileInput.target.files && fileInput.target.files[0]) {
			// Size Filter Bytes
			const MAX_SIZE = 20971520;
			const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

			if (fileInput.target.files[0].size > MAX_SIZE) {
				this.imageError =
					'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
				return false;
			}
			if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
				this.imageError = 'Only Images are allowed ( JPG | PNG )';
				return false;
			}
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const image = new Image();
				image.src = e.target.result;
				image.onload = rs => {
					const imgBase64Path = e.target.result;
					this.cardImageBase64 = imgBase64Path;
					this.isImageSaved = true;

					this.article.image_media_type = fileInput.target.files[0].type;
					if (this.article.image_media_type != undefined) {
						const head = this.article.image_media_type.length + 13;
						this.article.image_data = e.target.result.substring(head, e.target.result.length);
					}

				};
			};
			reader.readAsDataURL(fileInput.target.files[0]);
		}
		return true;
	}

	goBack(): void {
		this.location.back();
	}
}

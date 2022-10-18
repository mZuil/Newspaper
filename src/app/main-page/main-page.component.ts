import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../interfaces/Article';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
	articlesList?: Article[];
	groupingLists: Article[][] = [];
	idDeleted: number;

	constructor(private newsService: NewsService, private loginService: LoginService, private modalService: NgbModal) {
		this.idDeleted = -1;
	 }

	ngOnInit(): void {
		//We get all the articles
		this.getAllArticles();
	}

	getAllArticles(): void {
		this.newsService.getArticles().subscribe(list => {
			console.log(list.length);
			this.articlesList = list;
			for (let i = 0; i < this.articlesList.length / 3; i++) {
				this.groupingLists.push(this.articlesList.slice(i * 3, i * 3 + 3));
			}
		});
	}

	//A function to delete one article by using the id of the article
	removeArticle(modal: any): void {
		modal.close();
		console.log(this.idDeleted);
		this.newsService.deleteArticle(this.idDeleted).subscribe();
		this.idDeleted = -1;
		this.getAllArticles();
	}

	isLogged(): boolean{
		return this.loginService.isLogged();
	}

	openModal(content: any, id: number) {
		const activeModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		this.idDeleted = id;
	}
}

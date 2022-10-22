import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../interfaces/Article';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})



export class MainPageComponent implements OnInit {

	private readonly notifier: NotifierService;

	articlesList?: Article[];
	groupingLists: Article[][] = [];
	idDeleted: number;
	keyword?: string;
	selectedCategory: string = "All";
	isMenuCollapsed: boolean = true;

	filterAll = "All";
	filterCategories: Array<any> = [
		{ name: this.filterAll, value: true },
		{ name: "National", value: true },
		{ name: "Economy", value: true },
		{ name: "Sports", value: true },
		{ name: "Technology", value: true },
	];

	constructor(private newsService: NewsService, private loginService: LoginService, private modalService: NgbModal, private notifierService: NotifierService) {
		this.idDeleted = -1;
		this.notifier = this.notifierService;
	}

	ngOnInit(): void {
		this.getAllArticles();
	}

	getAllArticles(): void {
		this.newsService.getArticles().subscribe(articleList => {
			this.groupingLists = [];
			if(this.keyword) {
				articleList = articleList.filter(article => article.title?.toLocaleLowerCase().includes(this.keyword?.toLocaleLowerCase() ?? ""));
			}

			if (this.selectedCategory != this.filterAll) {
				articleList = articleList.filter(article => this.selectedCategory == article.category);
				console.log(articleList);
			}
			
			/* Filtering for more than one category
			if (!this.filterCategories.find(c => c.value && c.name == this.filterAll)) {
				articleList = articleList.filter(article => this.filterCategories.find(c => c.name == article.category && c.value) != undefined);
			}
			*/

			this.articlesList = articleList;
			for (let i = 0; i < this.articlesList.length / 3; i++) {
				this.groupingLists.push(this.articlesList.slice(i * 3, i * 3 + 3));
			}
		});
	}

	/* Function for choosing more categories
	addFilter(category: string): void {
		let notAll = false;
		let isAll = false;
		this.filterCategories.forEach(c => {
			if (c.name == category) {
				c.value = !c.value;
				if (!c.value && c.name != this.filterAll)
					notAll = true;
				if (c.value && c.name == this.filterAll)
					isAll = true;
			}
			if (isAll) {
				c.value = true;
			}
		});
		if (notAll) {
			this.filterCategories[0].value = false;
		}
	}
	*/

	//A function to delete one article by using the id of the article
	removeArticle(modal: any): void {
		modal.close();
		this.newsService.deleteArticle(this.idDeleted).subscribe(
			_ => {
				this.idDeleted = -1;
				this.getAllArticles();
				this.notifier.notify('success', 'Article successfully deleted');
			},
			//Error
			_ => {
				this.notifier.notify('error', "Error while deleting the article");
			}
		);
		
	}

	//A function that checks if the user is logged
	isLogged(): boolean {
		return this.loginService.isLogged();
	}

	//A function that opens a modal
	openModal(content: any, id: number) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		this.idDeleted = id;
	}
}

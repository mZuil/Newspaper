import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/Article';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  articlesList?: Article[];

  constructor(/*private newsService: NewsService*/) {}

  ngOnInit(): void {
    //We get all the articles
    //this.getAllArticles();
  }

  getAllArticles(): void{
    //this.newsService.getArticles().subscribe(list => this.articlesList = list);
    //console.log(this.articlesList?.length);
  }

}

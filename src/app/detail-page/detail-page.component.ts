import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/Article';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit{
  article: Article
  articleId?: string | null
  constructor(private route: ActivatedRoute, private location: Location, private newsService: NewsService) { 
    this.article = {} as Article;
    //{aut: 1, id: 1, category: "", username: "", abstract:"", thumbnail_image: "", thumbnail_media_type: "", subtitle:"", title:"", update_date: "", body: ""} 
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('articleId');
    this.newsService.getArticle(Number(this.articleId)).subscribe((a: Article) => {
      this.article = a
    })
  }

  goBack() : void {
    this.location.back();
  }

}

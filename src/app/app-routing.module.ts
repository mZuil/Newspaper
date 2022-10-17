import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModificationArticleComponent } from './modification-article/modification-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'detail/:articleId', component: DetailPageComponent }, 
  {path: 'article/:id', component: ModificationArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
        this.router.navigate(['']); // when the URL does not match redirect to initial default route
    }
  }
}

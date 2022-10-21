import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { OnWindowScrollDirective } from './directives/on-window-scroll.directive';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ModificationArticleComponent } from './modification-article/modification-article.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    OnWindowScrollDirective,
    DetailPageComponent,
    ModificationArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AngularEditorModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}

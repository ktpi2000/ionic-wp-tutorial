import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WordpressService } from '../wordpress.service';
import { IPost } from '../interfaces/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  ID: number;

  //記事データを格納する配列
  //初期値はnull
  post: IPost = {
    ID: null,
    title: null,
    content: null,
    date: null
  }

  constructor(
    public route: ActivatedRoute,
    public wordpress: WordpressService) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.ID = parseInt(params.get('articleId'), 10);
      })
  }

  //ページ表示アニメーションが終了したら発火
  ionViewDidEnter() {
    this.wordpress.getArticle(this.ID)
      .subscribe(data => {
        this.post = data;
      });
  }

}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //返り値の格納、配列になる
  posts: {
    ID: number;
    title: string;
    content: string;
    date: string;
  }[] = [];

  constructor(
    public http: HttpClient,
    public loadingController: LoadingController,
  ) { }

  async ionViewDidEnter() {

    //ローディングインジケータ生成
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    if (!this.posts.length) {
      await loading.present();
    }

    //インジケータ表示
    await loading.present();

    this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/')
      .subscribe(data => {
        this.posts = data['posts'];
        loading.dismiss();  //インジケータ削除
      });
  }
  trackByFn(index, item): number {
    return item.ID;
  }
}

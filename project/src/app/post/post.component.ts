import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnInit {
  commentData: any = {};
  postId: string;
  totalComments: string;
  commentsArray: Array<any> = [];
  commentPage: number = 1;
  post: any = {
    content: '',
    title: '',
    thumbnailUrl: '',
    lastModified: '',
    Url: '',
  };
  previousUrl: string;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
  getFromNow(date: any) {
    const lastModified = moment(new Date(date)).fromNow();
    return lastModified;
  }
  showMoreComments() {
    this.commentPage += 1;
    this.apiService
      .getPostComments(this.postId, '5', this.commentPage.toFixed())
      .subscribe((result: any) => {
        this.commentData = result.comments;
        this.commentData.forEach((element: any) => {
          this.commentsArray.push(element);
        });
      });
  }
  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.apiService
      .getPostComments(this.postId, '5', this.commentPage.toFixed())
      .subscribe((result: any) => {
        this.commentData = result;
        this.commentsArray = this.commentData.comments;
      });
    this.apiService.getPostComments(this.postId).subscribe((result: any) => {
      this.totalComments = result.found;
    });
    this.apiService.getPost(this.postId).subscribe((result: any) => {
      this.post.content = result.content;
      this.post.title = result.title;
      this.post.thumbnailUrl = result.post_thumbnail.URL;
      this.post.Url = result.URL;
      const lastModified = this.getFromNow(result.modified);
      this.post.lastModified = lastModified;
    });
  }
  ngOnDestroy() {}
}

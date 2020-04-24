import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import {
  ActivatedRoute,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { Location, PlatformLocation } from '@angular/common';

export const POSTS_PER_PAGE = 4;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent implements OnInit {
  allPages: number;
  data: any = {};
  posts: any = [];
  pageNumber: string;
  config = {
    itemsPerPage: 4,
  };
  previousUrl: string;
  isOn: boolean = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.previousUrl = e.url;
    });
  }
  ngOnInit() {
    this.pageNumber = this.route.snapshot.paramMap.get('page');
    if (!this.pageNumber) this.pageNumber = '1';
    this.apiService
      .getPosts(POSTS_PER_PAGE, this.pageNumber)
      .subscribe((result) => {
        this.data = result;
        this.posts = this.data.posts;
      });
  }
  ngOnDestroy() {
    // this.requestPosts.unsubscribe();
  }
}

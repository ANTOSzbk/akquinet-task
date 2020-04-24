import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  config: any = {
    currentPage: 1,
    totalItems: null,
  };
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.router.navigated)
      this.config.currentPage = this.route.snapshot.paramMap.get('page');
    this.apiService.getPosts().subscribe((result: any) => {
      const data = result;
      this.config.totalItems = data.found;
    });
  }
  handlePageChange(e: number) {
    this.router.navigateByUrl(``, { skipLocationChange: true }).then(() => {
      this.router.navigate([`/articles/${e}`]);
    });
  }
  ngOnInit(): void {}
}

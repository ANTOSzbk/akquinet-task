import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL: string = 'https://public-api.wordpress.com/rest/v1.1';
  siteURL: string = 'en.blog.wordpress.com';

  constructor(private http: HttpClient) {}

  public getPosts(limit?: number, page?: string) {
    if (!limit || !page)
      return this.http.get(`${this.apiURL}/sites/${this.siteURL}/posts`);
    const params = new HttpParams()
      .set('number', limit.toString())
      .set('page', page);
    return this.http.get(`${this.apiURL}/sites/${this.siteURL}/posts`, {
      params,
    });
  }
  public getPost(id: string) {
    return this.http.get(`${this.apiURL}/sites/${this.siteURL}/posts/${id}`);
  }
  public getPostComments(id: string, limit?: string, page?: string) {
    if (!limit || !page)
      return this.http.get(
        `${this.apiURL}/sites/${this.siteURL}/posts/${id}/replies/`
      );
    const params = new HttpParams()
      .set('number', limit.toString())
      .set('page', page);
    return this.http.get(
      `${this.apiURL}/sites/${this.siteURL}/posts/${id}/replies/`,
      { params }
    );
  }
}

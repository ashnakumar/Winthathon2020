import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {IPost} from './post.model';

@Injectable({ providedIn: "root" })
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>("http://localhost:3000/posts");
  }

  public searchPosts(searchQuery:string): Observable<IPost[]> {
    return this.http.post<IPost[]>("http://localhost:3000/search", {searchString: searchQuery})
  }

}

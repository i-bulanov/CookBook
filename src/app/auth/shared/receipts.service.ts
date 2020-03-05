import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateRes, Post} from './interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {strictEqual} from 'assert';

@Injectable({providedIn: 'root'})
export class ReceiptsService {
 constructor(private http: HttpClient) { }

 create(post: Post): Observable<Post> {
   return this.http.post(`${environment.fbDBUrl}/receipts.json`, post)
     .pipe(map((res: FbCreateRes) => {
       return {
         ...post,
         id: res.name,
         date: new Date(post.date)
       }
     }))
 }

 getAll(): Observable<Post[]> {
   return this.http.get(`${environment.fbDBUrl}/receipts.json`)
     .pipe(map((res: {[key: string]: any}) => {
       return Object
         .keys(res)
         .map( key => ({
           ...res[key],
           id: key,
           date: new Date(res[key].date)
         }))
   }))
 }

 getById(id: string): Observable<Post> {
   return this.http.get<Post>(`${environment.fbDBUrl}/receipts/${id}.json`)
     .pipe(map((post: Post) => {
       return {
         ...post,
         id,
         date: new Date(post.date)
       }
     }))
 }

 remove(id: string): Observable<void> {
   return this.http.delete<void>(`${environment.fbDBUrl}/receipts/${id}.json`)
 }

 update(post: Post): Observable<Post> {
   return this.http.patch<Post>(`${environment.fbDBUrl}/receipts/${post.id}.json`, post)
 }
}

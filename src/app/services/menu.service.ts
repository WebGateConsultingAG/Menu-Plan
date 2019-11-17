import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Menu} from '../module/menu';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}
  public getMenus() {
    /*
    return this.httpClient
    .get<Menu[]>(environment.apiGet + 'menus')
    .pipe(
      catchError(this.handleError<Menu[]>('getCommentForRequest', []))
    );*/
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

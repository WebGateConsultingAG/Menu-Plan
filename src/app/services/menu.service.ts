import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Menu} from '../module/menu';
import {HttpClient} from '@angular/common/http';
import {Types} from '../module/types';

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
    const menu1 = new Menu();
    menu1.title = 'test';
    menu1.description = 'beschreibung';
    menu1.date = new Date();
    menu1.id = '1';
    menu1.type = Types.DESERT;
    const test = [menu1];

    return of(test);
  }

  public saveMenu(menu: Menu) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

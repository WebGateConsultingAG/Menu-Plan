import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Menu } from "../module/menu";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "@webgate/ngx-aws-authenticator";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}
  public async getMenus() {
    return this.httpClient
      .get<Menu[]>(environment.apiUrl, {
        headers: new HttpHeaders({
          auth: await this.userService.getIdToken()
        })
      })
      .pipe(catchError(this.handleError<Menu[]>("getCommentForRequest", [])))
      .toPromise();
  }

  public async saveMenu(menu: Menu) {
    return this.httpClient
      .post<Menu>(`${environment.apiUrl}/${menu.id}`, menu, {
        headers: new HttpHeaders({
          auth: await this.userService.getIdToken()
        })
      })
      .pipe(catchError(this.handleError<Menu[]>("getCommentForRequest", [])))
      .toPromise();
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

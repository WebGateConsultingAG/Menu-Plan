import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import {
  AuthGuard,
  IDLoginRegistratorComponent
} from "@webgate/ngx-aws-authenticator";
import { APP_BASE_HREF } from "@angular/common";
import { environment } from "src/environments/environment";
import { HomeComponent } from "./components/home/home.component";

const routes: Route[] = [
  {
    path: "login",
    component: IDLoginRegistratorComponent,
    pathMatch: "full"
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [{ path: "", component: HomeComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.auth.routeBase }]
})
export class AppRoutingModule {}

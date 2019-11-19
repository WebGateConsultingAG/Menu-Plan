import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { FormDialogComponent } from "./components/form-dialog/form-dialog.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import {
  AwsAuthenticatorModule,
  AuthGuard
} from "@webgate/ngx-aws-authenticator";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [AppComponent, FormDialogComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AwsAuthenticatorModule.forRoot({
      userPoolId: environment.auth.userPoolId,
      clientId: environment.auth.clientId,
      allowRegister: false,
      userAttributes: {
        firstName: "string",
        lastName: "string"
      },
      identityProviderSettings: {
        providerName: environment.auth.providerName,
        redirectUri: environment.auth.redirectUrl,
        domainName: environment.auth.domainName
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [FormDialogComponent]
})
export class AppModule {}

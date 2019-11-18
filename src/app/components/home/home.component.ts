import { Component, OnInit } from "@angular/core";
import { FormDialogComponent } from "../form-dialog/form-dialog.component";
import { Menu } from "src/app/module/menu";
import { MenuService } from "src/app/services/menu.service";
import { MatDialog } from "@angular/material";
import { Day } from "src/app/module/day";
import * as moment from "moment";
import { UserService } from "@webgate/ngx-aws-authenticator";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  title = "menu-plan";
  days: Day[] = [];
  isAdmin = false;
  constructor(
    private menuService: MenuService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    moment.locale("de");
    const startDate = this.getStartDate();
    for (let i = 0; i < 5; i++) {
      const day = new Day();
      day.date = moment(startDate);
      day.menus = [];
      this.days.push(day);
      startDate.add(1, "day");
    }
    this.userService.getIdToken().then(token => {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const json = JSON.parse(jsonPayload);
      if (json["cognito:groups"].indexOf("AWS_HR_Cognito_DEV") > -1) {
        this.isAdmin = true;
      }
    });
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().then((menus: Menu[]) => {
      menus.forEach(menu => {
        this.addMenuToDays(menu);
      });
    });
  }

  addMenuToDays(menu: Menu) {
    if (menu.date) {
      const momentDate = moment(menu.date);
      for (let i = 0; i < this.days.length; i++) {
        if (
          this.days[i].date.format("DD.MM.YYYY") ===
          momentDate.format("DD.MM.YYYY")
        ) {
          this.days[i].menus.push(menu);
        }
      }
    }
  }

  getStartDate() {
    let date = moment();
    const weekday = date.get("day");
    switch (weekday) {
      case 0:
        date.add(1, "day");
        break;
      case 2:
        date.add(-1, "day");
        break;
      case 3:
        date.add(-2, "day");
        break;
      case 4:
        date.add(-3, "day");
        break;
      case 5:
        date.add(-4, "day");
        break;
      case 6:
        date.add(2, "day");
        break;
    }
    return date;
  }

  //Display Functions
  getLineTitle(date: moment.Moment) {
    return date.format("dd: DD.MM.YYYY");
  }

  openDialog(menu: Menu) {
    this.dialog.open(FormDialogComponent, {
      data: {
        menu: menu
      }
    });
  }
}

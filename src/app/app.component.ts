import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Day} from './module/day';
import {MenuService} from './services/menu.service';
import {Menu} from './module/menu';
import {MatDialog} from '@angular/material';
import {FormDialogComponent} from './components/form-dialog/form-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'menu-plan';
  days: Day[] = [];

  constructor(private menuService: MenuService, public dialog: MatDialog) {}

  ngOnInit() {
    moment.locale('de');
    const startDate = this.getStartDate();
    for (let i = 0; i < 5; i++) {
      const day = new Day();
      day.date = moment(startDate);
      day.menus = [];
      this.days.push(day);
      startDate.add(1, 'day');
    }
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe((menus: Menu[]) => {
      menus.forEach(menu => {
        this.addMenuToDays(menu);
      });
    });
  }

  addMenuToDays(menu: Menu) {
    const momentDate = moment(menu.date);
    for (let i = 0; i < this.days.length; i++) {
      if (this.days[i].date.format('DD.MM.YYYY') === momentDate.format('DD.MM.YYYY')) {
        this.days[i].menus.push(menu);
      }
    }
  }

  getStartDate() {
    let date = moment();
    const weekday = date.get('day');
    switch (weekday) {
      case 0:
        date.add(1, 'day');
        break;
      case 2:
        date.add(-1, 'day');
        break;
      case 3:
        date.add(-2, 'day');
        break;
      case 4:
        date.add(-3, 'day');
        break;
      case 5:
        date.add(-4, 'day');
        break;
      case 6:
        date.add(2, 'day');
        break;
    }
    return date;
  }

  //Display Functions
  getLineTitle(date: moment.Moment) {
    return date.format('dd: DD.MM.YYYY');
  }

  openDialog(menu: Menu) {
    this.dialog.open(FormDialogComponent, {
      data: {
        menu: menu
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Day} from './module/day';
import {MenuService} from './services/menu.service';
import {getNumberOfCurrencyDigits} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'menu-plan';
  days: Day[] = [];

  constructor(private menuService: MenuService) {}

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
    this.menuService.getMenus().subscribe(menus => {});
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
}

import { Component, OnInit, Input, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Menu } from "src/app/module/menu";
import { FormGroup, FormControl } from "@angular/forms";
import { MenuService } from "src/app/services/menu.service";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"]
})
export class FormDialogComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public data: any;
  form: FormGroup;
  menu: Menu;
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    if (this.data && this.data.menu) {
      this.menu = this.data.menu as Menu;
    } else {
      this.menu = null;
    }
    this.form = new FormGroup({
      id: new FormControl(this.menu ? this.menu.id : "@New"),
      date: new FormControl(this.menu ? this.menu.date : new Date()),
      title: new FormControl(this.menu ? this.menu.title : ""),
      description: new FormControl(this.menu ? this.menu.description : ""),
      type: new FormControl(this.menu ? this.menu.type : null)
    });
  }

  getDialogTitle() {
    if (this.menu) {
      return "Menü bearbeiten";
    } else {
      return "neues Menü";
    }
  }

  save() {
    const toSave: Menu = this.form.value;
    this.menuService.saveMenu(toSave);
  }
}

import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  mobileViewport: boolean = false;
  navIcon: string;
  screenWidth: number = window.innerWidth;
  constructor() {
    this.getScreenSize();
    this.navIcon = "menu";
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?:any) {
    this.screenWidth = window.innerWidth;
    this.mobileViewport = this.screenWidth < 768;
  }

  toggleNavbarIcon() {
    if(this.navIcon == "close") {
      this.navIcon = "menu";
    } else {
      this.navIcon = "close";
    }
  }


}

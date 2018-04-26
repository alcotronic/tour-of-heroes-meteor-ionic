import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { HeroesComponent }      from '../pages/heroes/heroes.component';
import { HeroAddComponent }  from '../pages/hero-add/hero-add.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = DashboardComponent;
  menucontent: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.is('cordova')) {
        statusBar.styleDefault();
        splashScreen.hide();
      }
      menu.enable(true);
    });
  }

  goToDashboard() {
    this.nav.setRoot(DashboardComponent);
    this.menu.close();
  }

  goToHeroes() {
    this.nav.setRoot(HeroesComponent);
    this.menu.close();
  }

  goToHeroAdd() {
    this.nav.push(HeroAddComponent);
    this.menu.close();
  }
}

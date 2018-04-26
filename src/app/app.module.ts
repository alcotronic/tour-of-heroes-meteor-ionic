import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DashboardComponent }   from '../pages/dashboard/dashboard.component';
import { HeroAddComponent }  from '../pages/hero-add/hero-add.component';
import { HeroDetailComponent }  from '../pages/hero-detail/hero-detail.component';
import { HeroesComponent }      from '../pages/heroes/heroes.component';
import { HeroSearchComponent }  from '../pages/hero-search/hero-search.component';
import { MessagesComponent }    from '../pages/messages/messages.component';

import { HeroService }          from '../providers/hero/hero.service';
import { MessageService }       from '../providers/message/message.service';

@NgModule({
  declarations: [
    MyApp,
    DashboardComponent,
    HeroAddComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardComponent,
    HeroAddComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService,
    MessageService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

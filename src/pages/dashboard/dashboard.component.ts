import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Hero } from '../../api/models/hero';
import { HeroService } from '../../providers/hero/hero.service';
import { HeroDetailComponent }  from '../hero-detail/hero-detail.component';
import { HeroSearchComponent }  from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private navController: NavController, private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  goToHeroDetails(hero: Hero) {
    this.navController.push(HeroDetailComponent, {heroId: hero._id});
  }

  goToHeroSearch() {
    this.navController.push(HeroSearchComponent);
  }

}

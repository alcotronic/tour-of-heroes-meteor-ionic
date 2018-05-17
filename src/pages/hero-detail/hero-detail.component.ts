import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Hero } from '../../../api/models/hero';
import { HeroService } from '../../providers/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  heroId: string;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    private heroService: HeroService
  ) {
    this.heroId = navParams.get('heroId');
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.heroService.getHero(this.heroId)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.navController.pop();
  }

  save(): void {
    this.heroService.updateHero(this.hero);
    this.goBack();
  }
}

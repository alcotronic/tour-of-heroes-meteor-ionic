import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Hero } from '../../api/models/hero';
import { HeroService } from '../../providers/hero/hero.service';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html'
})
export class HeroAddComponent implements OnInit {

  constructor(private navController: NavController, private heroService: HeroService) {}

  ngOnInit(): void {

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero);
    this.navController.pop();
  }

  goBack(): void {
    this.navController.pop();
  }
}

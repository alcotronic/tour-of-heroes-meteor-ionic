import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Hero } from '../../api/models/hero';
import { HeroService } from '../../providers/hero/hero.service';
import { HeroDetailComponent }  from '../hero-detail/hero-detail.component';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private navController: NavController, private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      //switchMap((term: string) => this.heroService.searchHeroes(term)),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  goToHeroDetails(hero: Hero) {
    this.navController.push(HeroDetailComponent, {heroId: hero._id});
  }

  goBack(): void {
    this.navController.pop();
  }
}

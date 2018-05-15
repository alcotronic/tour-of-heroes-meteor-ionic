import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

import { Hero } from '../../api/models/hero';
import { Heroes } from '../../api/collections/heroes';
import { MessageService } from '../message/message.service';

@Injectable()
export class HeroService {

  private heroes: ObservableCursor<Hero>;

  constructor(public messageService: MessageService) {
    MeteorObservable.subscribe('heroList').subscribe(()=> {
      MeteorObservable.autorun().subscribe(() => {
        this.heroes = Heroes.find({});
      });
    });
  }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    this.heroes = Heroes.find({});
    return this.heroes;
  }

  /** GET hero by id */
  getHero(id: string): Observable<Hero> {
    return of(Heroes.findOne({_id: id}));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      console.log("search term empty!");
      return of([]);
    } else {
      console.log("search term: "+term);
      return Observable.create(observer => {
        MeteorObservable.subscribe('heroListSearch', term).subscribe(()=> {
          observer.next(Heroes.find({"name": term}).fetch());
          observer.complete();
        });
      });
    }

  }

  /** add a new hero to the server */
  addHero (hero: Hero): void {
    MeteorObservable.call('addHero', hero).subscribe({
      next: () => {
        this.messageService.show('Hero was added.');
      },
      error: (error: Error) => {
        this.messageService.show('Hero was not added.');
      }
    });
  }

  /** delete the hero from the server */
  deleteHero (hero: Hero | string): void {
    const id = typeof hero === 'string' ? hero : hero._id;

    MeteorObservable.call('removeHero', id).subscribe({
      next: () => {
        this.messageService.show('Hero was removed.');
      },
      error: (error: Error) => {
        this.messageService.show('Hero was not removed.');
      }
    });
  }

  /** update the hero on the server */
  updateHero (hero: Hero): void {
    MeteorObservable.call('updateHero', hero).subscribe({
      next: () => {
        this.messageService.show('Hero was updated.');
      },
      error: (error: Error) => {
        this.messageService.show('Hero was not updated.');
      }
    });
  }

}

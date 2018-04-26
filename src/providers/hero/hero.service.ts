import { Injectable } from '@angular/core';

import { Meteor } from 'meteor/meteor';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';

import { Hero } from '../../api/models/hero';
import { Heroes } from '../../api/collections/heroes';
import { MessageService } from '../message/message.service';

@Injectable()
export class HeroService {

  private heroes: ObservableCursor<Hero>;

  constructor(private messageService: MessageService) {
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

  /** GET hero by id. Will 404 if id not found */
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
        MeteorObservable.subscribe('heroListSearch', term).zone().subscribe(()=> {
          observer.next(Heroes.find({"name": term}).fetch());
          observer.complete();
        });
      });
    }

  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): void {
    Meteor.call('addHero', hero, function(error) {
      if(error && error.error === "hero-add-error") {
        console.log(error.message);
      }
    });
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | string): void {
    const id = typeof hero === 'string' ? hero : hero._id;
    Meteor.call('removeHero', id, function(error) {
      if(error && error.error === "hero-not-exists") {
        console.log(error.message);
      }
    });
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): void {
    Meteor.call('updateHero', hero, function(error) {
      if(error && error.error === "hero-not-exists") {
        console.log(error.message);
      }
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Hero } from '../../models/hero';
import { Heroes } from '../../collections/heroes';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addHero(hero: Hero) {
    Heroes.insert({
      name: hero.name
    });
  },
  removeHero(id: string) {
    check(id, nonEmptyString);

    const heroExists = !!Heroes.collection.find({_id: id}).count();

    if(!heroExists) {
      throw new Meteor.Error('hero-not-exists', 'hero does not exist!');
    }

    Heroes.remove({
      _id: id
    });
  },
  updateHero(hero: Hero) {
    check(hero._id, nonEmptyString);
    check(hero.name, nonEmptyString);

    const heroExists = !!Heroes.collection.find(hero._id).count();

    if(!heroExists) {
      throw new Meteor.Error('hero-not-exists', 'hero does not exist!');
    }

    Heroes.update({
      _id: hero._id
    }, {
      name: hero.name
    });
  }
})

import { Meteor } from 'meteor/meteor';

import './methods/heroes';
import './publications/heroes';

import { Hero } from '../models/hero';
import { Heroes } from '../collections/heroes';

Meteor.startup(() => {
  // code to run on server at startup
  const HEROES: Hero[] = [
    { name: 'Mr. Nice' },
    { name: 'Narco' },
    { name: 'Bombasto' },
    { name: 'Celeritas' },
    { name: 'Magneta' },
    { name: 'RubberMan' },
    { name: 'Dynama' },
    { name: 'Dr IQ' },
    { name: 'Magma' },
    { name: 'Tornado' }
  ];

  console.log("hero count: "+Heroes.collection.find().count());

  if(Heroes.collection.find().count() === 0) {

    //var i: number = 0;

    //for(i < HEROES.length; i++;) {
    //  Heroes.insert(HEROES[i]);
    //}

    //console.log(i+" mock hero data inserted.");

    Heroes.insert({ name: 'Mr. Nice' });
    Heroes.insert({ name: 'Narco' });
    Heroes.insert({ name: 'Bombasto' });
    Heroes.insert({ name: 'Celeritas' });
    Heroes.insert({ name: 'Magneta' });
    Heroes.insert({ name: 'RubberMan' });
    Heroes.insert({ name: 'Dynama' });
    Heroes.insert({ name: 'Dr IQ' });
    Heroes.insert({ name: 'Magma' });
    Heroes.insert({ name: 'Tornado' });

    console.log("mock hero data inserted.");
  } else {
    console.log("hero mock data already existing.");
  }

  console.log("Creating mongo index for heroes.");
  Heroes.collection._ensureIndex({ "name" : "text" });
});

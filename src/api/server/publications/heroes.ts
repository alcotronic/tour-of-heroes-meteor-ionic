import { Meteor } from 'meteor/meteor';

import { Heroes } from '../../collections/heroes';

Meteor.publish('heroList', function() {
  return Heroes.find({});
});

Meteor.publish('heroListSearch', function(term: string) {

  if(!term) {
    console.log("no search term!");
    return Heroes.find({});
  } else {
    console.log("searching for hero: "+term);
    return Heroes.find({ $text: { $search: term }});
  }

});

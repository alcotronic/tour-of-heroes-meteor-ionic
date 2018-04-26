# Tour of Heroes with Meteor and Ionic 3

This is version of the Tour of Heroes Tutorial from angular.io combined with meteor and ionic. This version switched graphical elements to ionic components and uses a sidemenu. To create this app I used the tour of heroes tutorial from angular.io, the tutorials from angular-meteor.com and the tutorial meteor and ionic from Jayser Mendez.

angular.io - https://angular.io

meteor - https://www.meteor.com/

angular-meteor - https://angular-meteor.com

ionic - https://ionicframework.com

meteor and ionic tutorial - https://steemit.com/utopian-io/@jaysermendez/setting-up-ionic-3-with-meteorjs-backend

## Usage

### Install dependencies

```
npm install
```

### Configuration

Set the "DDP_DEFAULT_CONNECTION_URL" variable in bundler.config.json to your needs - mostly for local testing the ip/hostname of your machine.

### Create client bundle
```
npm run meteor-client:bundle
```

### Run

You need to start both, ionic serve for the app and meteor for the api.

In one terminal in the project folder start the app with:

```
ionic serve --l
```

In one terminal in the src/api folder start meteor with:

```
meteor run
```

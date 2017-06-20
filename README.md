# A Pinterest Clone

**[Link to app](https://pintclone.herokuapp.com/)**

Built using [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) and [postgresql](https://www.postgresql.org/) for data storage.

The full list of tools used, and great documentation, can be found on the [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) page.

## Installation

### .env file

Create a ```.env``` file in the top level directory and add the following to it

```
GITHUB_KEY=
GITHUB_SECRET=
TWITTER_KEY=
TWITTER_SECRET=
JWT_SECRET=
SESSION_SECRET=
DATABASE_URL=
APP_URL=http://localhost:3000/
```

* Create a Github app and a Twitter app and add the credentails to the ```.env```
* Install postgresql locally and add the local URL
* Add a secret string to ```JWT_SECRET``` and ```SESSON_SESCRET```

### Other required alterations

Change the ```localStorageString``` in ```app/containers/App/auth.js``` to a custom value. Otherwise any other versions of this project will overwrite your local storage saves.

## Running

You must have Nodejs installed on your machine.

* ```npm install```
* ```npm start```

## License

[MIT](https://opensource.org/licenses/MIT)
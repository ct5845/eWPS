// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyCwXaBepj3WMQvxcwWUat4nYg2DaHTrqI8',
        authDomain: 'rowing-toolbox.firebaseapp.com',
        databaseURL: 'https://rowing-toolbox.firebaseio.com',
        projectId: 'rowing-toolbox',
        storageBucket: 'rowing-toolbox.appspot.com',
        messagingSenderId: '166544226449'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

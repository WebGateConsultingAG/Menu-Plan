// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://0rv7tzkiih.execute-api.us-east-1.amazonaws.com/default/menu",
  auth: {
    userPoolId: "us-east-1_lDsqMo5rc",
    clientId: "2h588ohbmgqtc0urd8kabvvrok",
    providerName: "aad",
    redirectUrl: "http://localhost:4200/login",
    domainName: "https://wgcad.auth.us-east-1.amazoncognito.com",
    routeBase: ""
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

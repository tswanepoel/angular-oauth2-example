import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://login.microsoftonline.com/da42b32f-4d0b-4079-951f-eb1dbea4e2c4/v2.0',
  redirectUri: window.location.origin,
  clientId: 'OAUTH CLIENT ID GOES HERE',
  scope: 'openid profile email'
};

import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { authConfig } from '../auth-config';
import openIdConfig from '../openid-config.json';
import openIdConfigKeys from '../openid-config.keys.json';
import { GraphApiService } from 'src/app/services/graph-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'OfficeApp';
  appIcon = faMicrosoft;
  menuIcon = faBars;
  isCollapsed = true;

  mail: string;
  photoUrl: string;

  constructor(
    private oauthService: OAuthService,
    private graphApiService: GraphApiService) {

    const config = openIdConfig as any;

    Object.assign(authConfig, {
      loginUrl: config.authorization_endpoint,
      logoutUrl: config.end_session_endpoint,
      grantTypesSupported: config.grant_types_supported,
      issuer: config.issuer,
      tokenEndpoint: config.token_endpoint,
      userinfoEndpoint: config.userinfo_endpoint,
      jwksUri: config.jwks_uri,
      sessionCheckIFrameUrl: config.check_session_iframe,
      jwks: openIdConfigKeys
    });

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.events.subscribe(e => {
      this.onIdentityClaimsChanged();
    });

    this.oauthService.tryLogin();
  }

  ngOnInit(): void {
    this.onIdentityClaimsChanged();
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  logOut(): void {
    this.oauthService.logOut();
  }

  get sub() { return this.getClaimValue('sub'); }
  get name() { return this.getClaimValue('name'); }

  private onIdentityClaimsChanged(): void {

    if (!this.sub) {
      this.photoUrl = null;
      return;
    }

    this.graphApiService.getProfile().subscribe(profile => {
      this.mail = profile.mail;

      this.photoUrl = this.mail
        ? `https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=${this.mail}&UA=0&size=HR64x64`
        : null;
    });
  }

  private getClaimValue(name) {
    const claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      return null;
    }

    return claims[name];
  }
}

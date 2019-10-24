import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  constructor(
    private session: SessionService,
  ) {
  }

  public isSignedIn() {
    return !!this.session.accessToken;
  }

  public doSignOut() {
    this.session.destroy();
  }

  public doSignIn(id: number, name: string, email: string, profileImage: string, accessToken: string) {
    if ((!id) || (!name) || (!email) || (!accessToken)) {
      return;
    }
    this.session.id = id;
    this.session.name = name;
    this.session.email = email;
    this.session.profileImage = profileImage;
    this.session.accessToken = accessToken;
  }

}

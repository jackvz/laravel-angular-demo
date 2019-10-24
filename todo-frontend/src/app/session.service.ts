import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  public id: number;
  public name: string;
  public email: string;
  public profileImage: string;
  public accessToken: string;

  constructor() {
  }

  public destroy(): void {
    this.id = null;
    this.name = null;
    this.email = null;
    this.profileImage = null;
    this.accessToken = null;
  }
}

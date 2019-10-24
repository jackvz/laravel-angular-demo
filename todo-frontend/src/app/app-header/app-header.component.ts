import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { environment } from 'src/environments/environment';

const STORAGE_URL = environment.storageUrl;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  userName: string;
  userProfileImage: string;

  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {
    this.userName = this.session.name;
    if (this.session.profileImage) {
      this.userProfileImage = STORAGE_URL + this.session.profileImage;
    }
    console.log(this.userProfileImage);
  }
}

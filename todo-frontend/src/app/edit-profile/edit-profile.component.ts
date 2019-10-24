import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public UserId: number;
  public UserName: string;
  public UserEmail: string;
  public UserProfileImage: string;

  public frm: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private session: SessionService
  ) {
    this.frm = fb.group({
      name: [this.session.name, Validators.required],
      email: [this.session.email, Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSave() {

    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const name = this.frm.get('name').value;
    const email = this.frm.get('email').value;
    const password = this.frm.get('password').value;

    // Submit request to API
    this.api
      .saveProfile(name, email, password)
      .subscribe(
        (response) => {
          this.router.navigate(['todos']);
        },
        (error) => {
          this.isBusy = false;
          this.hasFailed = true;
        }
      );
  }

  public navUploadAvatar() {
    this.router.navigate(['upload-avatar']);
  }

  public navTodos() {
    this.router.navigate(['todos']);
  }

}

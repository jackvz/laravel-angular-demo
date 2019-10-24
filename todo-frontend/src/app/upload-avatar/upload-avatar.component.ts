import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../upload.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {

  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    this.error = '';
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.uploadService
      .upload(formData, this.userId)
      .subscribe(
        (res) => {
          this.uploadResponse = res;
          this.session.profileImage = res.profile_image;
          this.router.navigate(['todos']);
        },
        (err) => this.error = err
      );
  }

  public navTodos() {
    this.router.navigate(['todos']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  akses = this.api.akses;

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    router: Router,
    private api: ApiService
  ) {
    if (this.akses != null) {
      router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit() {
    this.http
      .get(
        env.api +
          env.tabelUser +
          '?email=' +
          this.loginForm.value.email +
          '&password=' +
          this.loginForm.value.password
      )
      .subscribe((res: any) => {
        if (res.length == 0) {
          window.alert('Email dan Password salah');
        } else {
          const dataLogin = this.loginForm.getRawValue();
          dataLogin.time = Date();

          this.http.post(env.api + 'login/', dataLogin).subscribe(() => {
            localStorage.setItem('user', JSON.stringify(res[0]));
            window.location.replace('/dashboard');
          });
        }
      });
  }
}

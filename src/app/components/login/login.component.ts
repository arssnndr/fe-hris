import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.router.navigateByUrl('/dashboard');
    }
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

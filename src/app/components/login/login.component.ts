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
    if (localStorage.getItem('key') !== null) {
      this.router.navigateByUrl('/dashboard');
    }
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.http
      .post(env.api + 'login/', this.loginForm.getRawValue())
      .subscribe((res: any) => {
        localStorage.setItem('key', res.email);
        window.location.replace('/dashboard');
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VALUES } from 'src/app/Constants/Constants';
import { listRoles, listUsers } from './data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  }

  clickOnLogin() {
    if (this.form.get('user')?.value === VALUES.user && this.form.get('password')?.value === VALUES.password) {
      sessionStorage.setItem('data', JSON.stringify(listUsers));
      sessionStorage.setItem('roles', JSON.stringify(listRoles));
      this.router.navigate(['/users/list'])
    }
    else
      alert("Clave incorrecta");
  }

}

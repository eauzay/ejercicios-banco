import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VALUES } from 'src/app/Constants/Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
     alert("Éxito");
    }
    else
      alert("Clave incorrecta");
  }

}

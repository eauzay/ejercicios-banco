import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  form!: FormGroup;
  listUsers!: Array<User>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    let data = sessionStorage.getItem('data');
    this.listUsers = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    })
  }

  onClickSaveButton() {
    let user: User;
    user = {
      id: this.listUsers.length + 1,
      name: this.form.get('name')?.value,
      identification: this.form.get('identification')?.value,
      city: this.form.get('city')?.value,
    }

    this.listUsers.push(user);
    sessionStorage.setItem('data', JSON.stringify(this.listUsers));
    this.form.reset();
    this.router.navigate(['/users/list'])
  }
}
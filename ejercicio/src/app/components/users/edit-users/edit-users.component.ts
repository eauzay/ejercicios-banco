import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  listUsers!: Array<User>;
  userEdit: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private currentRoute: ActivatedRoute) {
    let data = sessionStorage.getItem('data');
    this.listUsers = (data !== null) ? JSON.parse(data) : null
  }

  ngOnInit(): void {
    // let user: any;
    this.id = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.userEdit = this.listUsers.find(x => x.id === this.id);
    this.initForm(this.userEdit);
  }

  initForm(userEdit: any) {
    this.form = this.formBuilder.group({
      name: new FormControl(userEdit.name, Validators.required),
      identification: new FormControl(userEdit.identification, Validators.required),
      city: new FormControl(userEdit.city, Validators.required)
    })
  }

  onClickSaveButton() {
    let user: User;
    let position;
    user = {
      id: this.id,
      name: this.form.get('name')?.value,
      identification: this.form.get('identification')?.value,
      city: this.form.get('city')?.value,
    }
    // this.
    position = this.listUsers.indexOf(this.userEdit);
    this.listUsers[position] = user;
    // this.listUsers.push(user);
    sessionStorage.setItem('data', JSON.stringify(this.listUsers));
    this.form.reset();
    this.router.navigate(['/users/list'])
  }

}

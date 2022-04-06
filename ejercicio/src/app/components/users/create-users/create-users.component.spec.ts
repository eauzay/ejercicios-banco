import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { CreateUsersComponent } from './create-users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { listUsers } from '../../auth/login/data';

describe('CreateUsersComponent', () => {
  let component: CreateUsersComponent;
  let fixture: ComponentFixture<CreateUsersComponent>;
  let data = listUsers;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUsersComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data to create user required', () => {
    expect(component.form.valid).toBeFalse();
  })

  it('form valid', () => {
    component.form = formBuilder.group({
      name: new FormControl('eve'),
      identification: new FormControl('12'),
      city: new FormControl('quito')
    })

    expect(component.form.valid).toBeTrue();
  })

  it('form valid', () => {
    component.form = formBuilder.group({
      name: new FormControl('eve'),
      identification: new FormControl('12'),
      city: new FormControl('quito')
    })

    expect(component.form.valid).toBeTrue();
  })

  
  it('user create successfully', () => {
    component.listUsers = data;
    console.log(component.listUsers);
    component.form = formBuilder.group({
      name: new FormControl('prueba'),
      identification: new FormControl('1718899'),
      city: new FormControl('guayas')
    })

    expect(component.listUsers.length).toBe(3);
    component.onClickSaveButton();
    expect(component.listUsers.length).toBe(4);
  })
  
});

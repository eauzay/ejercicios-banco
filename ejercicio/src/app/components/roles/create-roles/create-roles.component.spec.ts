import { ComponentFixture, TestBed } from '@angular/core/testing';
import { listRoles } from '../../auth/login/data';

import { CreateRolesComponent } from './create-roles.component';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateRolesComponent', () => {
  let component: CreateRolesComponent;
  let fixture: ComponentFixture<CreateRolesComponent>;
  let data = listRoles;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRolesComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('data to create role required', () => {
    expect(component.form.valid).toBeFalse();
  })

  it('form valid', () => {
    component.form = formBuilder.group({
      name: new FormControl('admin'),
      descrption: new FormControl('administrador'),
    })

    expect(component.form.valid).toBeTrue();
  })

  it('role create successfully', () => {
    component.listRoles = data;

    component.form = formBuilder.group({
      name: new FormControl('admin'),
      description: new FormControl('administrador'),
    })

    expect(component.listRoles.length).toBe(3);
    component.onClickSaveButton();
    expect(component.listRoles.length).toBe(4);
  })
});

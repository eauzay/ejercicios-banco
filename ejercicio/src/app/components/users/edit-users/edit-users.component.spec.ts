import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { listUsers } from '../../auth/login/data';

import { EditUsersComponent } from './edit-users.component';

describe('EditUsersComponent', () => {
  let component: EditUsersComponent;
  let fixture: ComponentFixture<EditUsersComponent>;
  let data = listUsers;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUsersComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('form valid', () => {

    let userEdit = data.find(x => x.id === 2);
    component.form = formBuilder.group({
      name: new FormControl(userEdit?.name),
      identification: new FormControl(userEdit?.identification),
      city: new FormControl(userEdit?.city)
    })

    expect(component.form.valid).toBeTrue();
  })


  it('user edit successfully', () => {
    component.id = 2;

    let userEdit = data.find(x => x.id === component.id);


    component.form = formBuilder.group({
      name: new FormControl("Actualizado"),
      identification: new FormControl(userEdit?.identification),
      city: new FormControl(userEdit?.city)
    })

    expect(component.listUsers.length).toBe(3);
    component.onClickSaveButton();
    expect(component.listUsers.length).toBe(3);
  })

});

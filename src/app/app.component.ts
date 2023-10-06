import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'dynamic-forms';

  form!: FormGroup;

  medicineOptions = [
    { id: 1, name: 'Medicine 1' },
    { id: 2, name: 'Medicine 2' },
    { id: 3, name: 'Medicine 3' }
  ];

  formGroupArray!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      medicineArr: this.fb.array([this.createForm()])
    });

    this.formGroupArray = this.form.get('medicineArr') as FormArray;
  }

  get medicineFormGroup() {
    return this.form.get('medicineArr') as FormArray;
  }

  createForm(){
    return this.fb.group({
      medicine: [null],
      amount: [''],
      dosage: [null],
      duration: [null]
    });
  }

  addFormGroup() {
    const formGroup = this.fb.group({
      medicine: [''],
      amount: [''],
      dosage: [''],
      duration: ['']
    });

    this.formGroupArray.push(formGroup as never);
    this.form.addControl('medicineArr', formGroup);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

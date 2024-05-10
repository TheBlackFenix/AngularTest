import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FileValidationDirective } from '../../shared/directive/file-validation.directive';
import { CustomFileInputComponent } from '../../shared/components/custom-file-input/custom-file-input.component';

@Component({
  selector: 'app-input-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    FileValidationDirective,
    CustomFileInputComponent,
  ],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.css',
})
export class InputTestComponent {
  fb = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      file: [''],
      file2: [null, [Validators.required]],
      file3: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
  }
}

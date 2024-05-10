import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFileValidation]',
  standalone: true,
})
export class FileValidationDirective {
  @Input() allowTypes: string[] = ['image/jpeg', 'image/png'];
  @Input() base64: boolean = false;

  constructor(
    private el: ElementRef,
    private control: NgControl,
    private cd: ChangeDetectorRef
  ) {}

  @HostListener('change', ['$event.target']) onChange(
    input: HTMLInputElement | null
  ) {
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validar el tipo MIME del archivo
      if (this.allowTypes.includes(file.type)) {
        // Archivo válido: convertir a base64 si es necesario y asignar al control
        this.base64
          ? this.readFileAsBase64(file)
          : this.control.control?.setValue(file);
        this.el.nativeElement.value = file;
      } else {
        // Archivo no válido: dejar el control vacío
        this.control.control?.setValue(null);
      }
    }
  }

  private readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Asignar el valor al control (puede ser 'file' o 'base64' según tu lógica)
      this.control.control?.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }
}

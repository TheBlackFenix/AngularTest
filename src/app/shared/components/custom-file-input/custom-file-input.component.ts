import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-file-input',
  standalone: true,
  imports: [],
  templateUrl: './custom-file-input.component.html',
  styleUrl: './custom-file-input.component.css',
})
export class CustomFileInputComponent {
  @Input() control!: AbstractControl | FormControl;
  @Input() allowTypes: FileTypes[] = ['pdf'];
  @Input() base64: boolean = false;

  noValido: boolean = false;

  onFileChange(event: any) {
    this.noValido = false;
    this.control.markAsTouched();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.mimes.includes(file.type)) {
        console.log({ cont: this.control, file });
        this.base64
          ? this.readFileAsBase64(file)
          : this.control?.setValue(file);
      } else {
        this.noValido = true;
        this.control?.setValue(null);
        input.value = ''; // Limpiar el valor del input file
      }
    } else {
      this.control?.setValue(null);
      input.value = ''; // Limpia el valor del input file
    }
  }
  private readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.control?.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // Uso
  get mimes() {
    let selectedMimeTypes: string[] = [];

    this.allowTypes.forEach(type =>
      selectedMimeTypes.push(fileMimeTypes[type])
    );
    console.log({ selectedMimeTypes });

    return selectedMimeTypes;
  }
}

type FileTypes =
  | 'png'
  | 'pdf'
  | 'jpg'
  | 'txt'
  | 'doc'
  | 'xlsx'
  | 'mp3'
  | 'mp4'
  | 'gif'
  | 'html'
  | 'xml'
  | 'json'
  | 'css'
  | 'js'
  | 'csv'
  | 'ppt'
  | 'wav'
  | 'ogg'
  | 'zip'
  | 'tar'
  | 'rar'
  | '7z'
  | 'exe'
  | 'dll'
  | 'java'
  | 'py'
  | 'cpp'
  | 'c'
  | 'h'
  | 'php'
  | 'asp'
  | 'jsp'
  | 'sql'
  | 'bat'
  | 'sh'
  | 'log'
  | 'ico'
  | 'bmp'
  | 'tif'
  | 'svg'
  | 'woff'
  | 'woff2'
  | 'ttf'
  | 'otf'
  | 'eot';

const fileMimeTypes: { [key in FileTypes]: string } = {
  png: 'image/png',
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  txt: 'text/plain',
  doc: 'application/msword',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  gif: 'image/gif',
  html: 'text/html',
  xml: 'application/xml',
  json: 'application/json',
  css: 'text/css',
  js: 'application/javascript',
  csv: 'text/csv',
  ppt: 'application/vnd.ms-powerpoint',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  zip: 'application/zip',
  tar: 'application/x-tar',
  rar: 'application/vnd.rar',
  '7z': 'application/x-7z-compressed',
  exe: 'application/octet-stream',
  dll: 'application/octet-stream',
  java: 'text/x-java-source',
  py: 'text/x-python',
  cpp: 'text/x-c++src',
  c: 'text/x-csrc',
  h: 'text/x-chdr',
  php: 'application/x-php',
  asp: 'text/x-asp',
  jsp: 'text/x-jsp',
  sql: 'application/sql',
  bat: 'application/bat',
  sh: 'application/x-sh',
  log: 'text/plain',
  ico: 'image/x-icon',
  bmp: 'image/bmp',
  tif: 'image/tiff',
  svg: 'image/svg+xml',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  otf: 'font/otf',
  eot: 'application/vnd.ms-fontobject',
  // Agrega más tipos según sea necesario
};

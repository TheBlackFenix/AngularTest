import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-test',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './pdf-test.component.html',
  styleUrl: './pdf-test.component.css',
})
export default class PdfTestComponent implements OnInit {
  sanitizer = inject(DomSanitizer);
  pdfSrc = 'https://core.ac.uk/download/pdf/61473672.pdf';
  pdfSafeSrc!: SafeResourceUrl;
  constructor() {}
  ngOnInit(): void {
    this.pdfSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.pdfSrc
    );
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Input() file: string = null;
  @Input() placeholder: string = 'Choisir un nouveau fichier';
  @Input() label: string = '';
  @Input() labelFile: string = 'Fichier actuel';
  @Input() acceptedFiles: string = '.pdf';
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fileSelected.emit(file);
    }
  }

  downloadFileInNewPage() {
    window.open(this.file, '_blank');
  }
}

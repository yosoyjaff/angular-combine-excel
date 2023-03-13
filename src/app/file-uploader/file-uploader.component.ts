import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
} from 'ngx-uploader';
import * as XLSX from 'xlsx';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('file') fileRef: ElementRef;

  public options: UploaderOptions;
  formData: FormData;
  public files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    private dateService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit(): void {}

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(
            (file) =>
              typeof output.file !== 'undefined' && file.id === output.file.id
          );
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter(
          (file: UploadFile) => file !== output.file
        );
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  startUpload(): void {
    console.log(this.files);
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' },
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  openDialog() {
    this.fileRef.nativeElement.click();
  }

  readFiles() {
    if (this.files.length == 0) {
      this.snackBar.open('No has cargado archivos', 'OK', {
        duration: 3000,
      });
    } else {
      this.dateService.JsonData.length = 0;
      this.files.forEach((file, index) => {
        let reader = new FileReader();
        let name = file.name;
        reader.onload = (e) => {
          var data = e.target.result;
          let wb = XLSX.read(data, { type: 'binary' });
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          let json: any[];
          if (index == 0) {
            json = XLSX.utils.sheet_to_json(ws, { header: 1 });
            json.forEach((el) => {
              this.dateService.JsonData.push(el);
            });
          } else {
            let d: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
            delete d[0];
            d.forEach((el) => {
              this.dateService.JsonData.push(el);
            });
          }
        };
        reader.readAsBinaryString(file.nativeFile);
      });
      this.router.navigateByUrl('/display');
    }
  }
}

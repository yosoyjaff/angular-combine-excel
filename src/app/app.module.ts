import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UiModule } from './ui/ui.module';
import { TableDataComponent } from './table-data/table-data.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxUploaderModule } from 'ngx-uploader';
@NgModule({
  declarations: [AppComponent, FileUploaderComponent, TableDataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxUploaderModule,
    UiModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  exports: [NgxUploaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { TableDataComponent } from './table-data/table-data.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'upload',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'upload',
  },
  {
    path: 'display',
    component: TableDataComponent,
  },
  {
    path: 'upload',
    component: FileUploaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}

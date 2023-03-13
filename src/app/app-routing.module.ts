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
    path: 'upload',
    component: FileUploaderComponent,
  },
  {
    path: 'display',
    component: TableDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule],
})
export class AppRoutingModule {}

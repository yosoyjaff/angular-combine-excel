import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  exports: [MatCardModule, MatIconModule, MatButtonModule],
})
export class UiModule {}

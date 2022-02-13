import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, LoadingSpinnerComponent, DropDownDirective],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropDownDirective,
    CommonModule,
  ],
})
export class SharedModule {}

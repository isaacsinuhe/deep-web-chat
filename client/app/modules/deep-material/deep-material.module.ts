import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdSnackBarModule } from '@angular/material'; 

import {
  MdDatepickerModule, MdSidenavModule, MdInputModule,
  MdGridListModule, MdIconModule, MdTabsModule, MdTooltipModule,
  MdButtonModule, MdCheckboxModule, MdDialogModule} from '@angular/material'

@NgModule({
  imports: [
    MdTooltipModule,
    CommonModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdTabsModule,
    MdIconModule,
    MdSidenavModule,
    MdDatepickerModule,
    MdSnackBarModule,
    MdDialogModule,
    MdGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdTooltipModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdTabsModule,
    MdIconModule,
    MdDatepickerModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdDialogModule,
    MdGridListModule
  ],
  declarations: []
})
export class DeepMaterialModule { }

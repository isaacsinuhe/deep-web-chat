import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdSnackBarModule } from '@angular/material'; 

import {
  MdDatepickerModule, MdSidenavModule, MdInputModule,
  MdGridListModule, MdIconModule, MdTabsModule,
  MdButtonModule, MdCheckboxModule} from '@angular/material'

@NgModule({
  imports: [
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
    MdGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdTabsModule,
    MdIconModule,
    MdDatepickerModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdGridListModule
  ],
  declarations: []
})
export class DeepMaterialModule { }

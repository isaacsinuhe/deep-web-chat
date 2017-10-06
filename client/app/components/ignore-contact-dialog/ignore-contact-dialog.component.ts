import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'deep-ignore-contact-dialog',
  templateUrl: './ignore-contact-dialog.component.html',
  styleUrls: ['./ignore-contact-dialog.component.css']
})
export class IgnoreContactDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<IgnoreContactDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

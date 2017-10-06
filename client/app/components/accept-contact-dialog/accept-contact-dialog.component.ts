import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'deep-accept-contact-dialog',
  templateUrl: './accept-contact-dialog.component.html',
  styleUrls: ['./accept-contact-dialog.component.css']
})
export class AcceptContactDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AcceptContactDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

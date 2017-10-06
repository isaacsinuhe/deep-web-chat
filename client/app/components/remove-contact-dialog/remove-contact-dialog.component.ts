import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'deep-remove-contact-dialog',
  templateUrl: './remove-contact-dialog.component.html',
  styleUrls: ['./remove-contact-dialog.component.css']
})
export class RemoveContactDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<RemoveContactDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

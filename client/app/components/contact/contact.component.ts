import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { ContactDialogComponent } from './../contact-dialog/contact-dialog.component'

@Component({
  selector: 'deep-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input () name
  @Input () username
  @Input () email
  @Input () id
  constructor(public dialog: MdDialog) { }
  
  ngOnInit() {
  }

  openContactOptions () {
    console.log(this.id)
    // this.dialog.open()
  }

  addContact () {
    this.openDialog('add')
  }
  removeContact () {
    this.openDialog('remove')
  }

  openDialog(operation) {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '500px',
      data: { id: this.id, name: this.name, operation}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
    });
  }
}
  
  

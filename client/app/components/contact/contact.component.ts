import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { ContactDialogComponent } from './../contact-dialog/contact-dialog.component'
import { CONTACT } from '../../enums/contact.enum'

@Component({
  selector: 'deep-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input () fullname
  @Input () username
  @Input () email
  @Input () id
  @Input () status

  constructor(public dialog: MdDialog) { }
  
  ngOnInit() {
  }

  addContact () {
    console.log(this.id)
    this.openDialog()
  }
  removeContact () {
    console.log(this.id)
    this.openDialog()
  }

  openDialog() {
    let operation = ''
    if (this.status === CONTACT.ACCEPTED) {
      operation = 'remove'
    }else if (this.status === CONTACT.PENDING) {
      operation = 'add'
    }
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '500px',
      data: { id: this.id, name: this.fullname, operation}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
    });
  }
}
  
  

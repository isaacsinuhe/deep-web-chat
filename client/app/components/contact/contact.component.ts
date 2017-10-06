import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { AddContactDialogComponent } from './../add-contact-dialog/add-contact-dialog.component'
import { AcceptContactDialogComponent } from './../accept-contact-dialog/accept-contact-dialog.component'
import { IgnoreContactDialogComponent } from './../ignore-contact-dialog/ignore-contact-dialog.component'
import { RemoveContactDialogComponent } from './../remove-contact-dialog/remove-contact-dialog.component'
import { CONTACT } from '../../enums/contact.enum'
import { ContactsService } from '../../services/contacts.service'
import { ConversationsService } from '../../services/conversations.service'

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

  constructor(
    public dialog: 
    MdDialog, 
    private contactsService: ContactsService,
    private conversationsService: ConversationsService
  ) { }
  
  ngOnInit() {
  }
  
  addContact () {
    this.baseDialog(AddContactDialogComponent)
    .subscribe(result => {
      console.log('The dialog was closed', result)
      if (result) {
        this.contactsService.addContact(this.id)
          .subscribe((response) => {
            if (!response.added) return 0
            // this.contactsService.Contacts.removeContact(response.contact)
            response.contact.status = response.contactStatus
            this.contactsService.Contacts.addContact(response.contact)
            this.conversationsService.Conversations.addConversation(response.conversation)
          })
      }
    })
  }

  acceptContact () {
    this.baseDialog(AcceptContactDialogComponent)
      .subscribe(result => {
        console.log('The dialog was closed', result)
        if (result) {
          this.contactsService.acceptContact(this.id)
            .subscribe(response => {
              // if (!response.added) return 0
              console.log('contact accepted', response);
              
            // response.contact.status = response.contactStatus
            // this.contactsService.Contacts.addContact(response.contact)
            // this.conversationsService.Conversations.addConversation(response.conversation)
          })
      }
    })
  }

  ignoreContact () {
    this.baseDialog(IgnoreContactDialogComponent)
    .subscribe(result => {
      console.log('The dialog was closed', result)
      if (result) {
        this.contactsService.ignoreContact(this.id)
          .subscribe((response) => {
            if (!response.added) return 0
            // this.contactsService.Contacts.removeContact(response.contact)
            // response.contact.status = response.contactStatus
            // this.contactsService.Contacts.addContact(response.contact)
            // this.conversationsService.Conversations.addConversation(response.conversation)
          })
      }
    })
  }
  
  removeContact () {
    this.baseDialog(RemoveContactDialogComponent)
      .subscribe(result => {
        console.log('The dialog was closed', result)
        if (result) {
          this.contactsService.removeContact(this.id)
            .subscribe((response) => {
              if (!response.added) return 0
              // this.contactsService.Contacts.removeContact(response.contact)
              response.contact.status = response.contactStatus
              this.contactsService.Contacts.addContact(response.contact)
              this.conversationsService.Conversations.addConversation(response.conversation)
            })
        }
      })
  }
  baseDialog (component) {
    const dialogRef = this.dialog.open(component, {
      width: '500px',
      data: { id: this.id, name: this.fullname}
    })
    return dialogRef.afterClosed()
  }
}
  
  

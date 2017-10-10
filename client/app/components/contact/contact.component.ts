import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { AddContactDialogComponent } from './../add-contact-dialog/add-contact-dialog.component'
import { AcceptContactDialogComponent } from './../accept-contact-dialog/accept-contact-dialog.component'
import { IgnoreContactDialogComponent } from './../ignore-contact-dialog/ignore-contact-dialog.component'
import { RemoveContactDialogComponent } from './../remove-contact-dialog/remove-contact-dialog.component'
import { CONTACT } from '../../enums/contact.enum'
import { ContactsService } from '../../services/contacts.service'
import { SocketService } from '../../services/socket.service'
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
    private socketService: SocketService,
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
            console.log(response);
            response.contact.status = response.contactStatus
            this.contactsService.Contacts.addContact(response.contact)
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
            .subscribe(({accepted, conversation, conversationStatus,
              contact, contactStatus}) => {

              if (!accepted) return 0
              console.log('contact accepted', contact)
              this.socketService.joinRoom(conversation)
              this.contactsService.Contacts.updateContactStatus(contact._id, contactStatus)
              conversation.status = conversationStatus
              this.conversationsService.Conversations.addConversation(conversation)
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
          .subscribe(({contact, ignored}) => {
            if (!ignored) return 0
            console.log(contact)
            this.contactsService.Contacts.removeContact(contact)
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
            .subscribe(({removed, contact}) => {
              console.log(removed, contact);
              
              if (!removed) return 0
              this.contactsService.Contacts.removeContact(contact)
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
  
  

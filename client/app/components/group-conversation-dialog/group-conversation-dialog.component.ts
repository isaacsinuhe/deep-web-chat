import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { FormBuilder, Validators } from '@angular/forms'
import { ContactsService } from '../../services/contacts.service'

@Component({
  selector: 'deep-group-conversation-dialog',
  templateUrl: './group-conversation-dialog.component.html',
  styleUrls: ['./group-conversation-dialog.component.css']
})
export class GroupConversationDialogComponent implements OnInit {
  public contacts = []
  constructor(
    private contactsService: ContactsService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<GroupConversationDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateList(item, {checked}) {
    console.log(checked);
    
    if (checked) {
      if (!this.contacts.includes(item))
        this.contacts.push(item)
    } else {
      let index
      if ((index = this.contacts.indexOf(item)) !== -1)
        this.contacts.splice(index, 1)
    }
  }

  getValues (name) {
    
    return {
      name: name.value,
      contacts: this.contacts
    }
  }
}

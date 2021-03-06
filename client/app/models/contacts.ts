export interface IContacts {
    findById: () => Contact
}

export class Contacts {
    contactList: Contact[] = new Array
    constructor (contacts) {
        contacts.forEach(contact => {
            this.addContact(contact)
        });
    }

    addContact (contact) {
        this.contactList.push(new Contact(contact))
    }

    updateContactStatus (contactId, status) {
        this.findById(contactId).setStatus(status)
    }

    removeContact (contact): Boolean {
        
        // tslint:disable-next-line:forin
        for (const index in this.contactList) {
            if (this.contactList[index]._id === contact._id) {
                this.contactList.splice(+index, 1)
                return true
            }
        }
        return false
    }

    findById (contactId): Contact {
        for (const contact of this.contactList) {
            if (contact._id === contactId) return contact
        }
        return null
    }

    getContactsAsArray () {
        return this.contactList
    }

    getContactsIds () {
        const ids = []
        
        this.contactList.forEach((value, key) => {
            ids.push(value._id)
        })
        return ids
    }
}

export interface IContact {
    email
    fullname
    status
    username
    _id
}
export class Contact {
    public email
    public fullname
    public status
    public username
    public _id

    constructor (contact) {
        this.email = contact.email
        this.fullname = contact.fullname
        this.status = contact.status
        this.username = contact.username
        this._id = contact._id
    }

    setStatus (status) {
        this.status = status
    }
}

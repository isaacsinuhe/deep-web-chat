import { Injectable } from '@angular/core'
import * as moment from 'moment'

export class Conversations {
    private conversations: Object[]
    private userId: string

    static createFromInitState (response) {
        const conversationList = []
        console.log(response, 'from session');
        
        response.conversations.forEach(conversation => {       
            // conversation.status = response.conversations.status

            const newConversation = Conversation.createFromInitState({
                status: conversation.status, 
                conversation: conversation.conversation
            })

            conversationList.push({
                [conversation.conversation._id]: newConversation
            })
        })
        return new Conversations(conversationList)
    }

    constructor ( conversationsList: Array<any> ) {
        this.conversations = conversationsList
        console.log(this.conversations);
        
    }

    getAll (): any[] {
        return this.conversations
    }

    getAllAsArray () {
        const arr = []
        for (const index in this.conversations) {
            if (this.conversations.hasOwnProperty(index)) {
                const conversation = this.conversations[index];
                for (const _id in conversation) {
                    if (conversation.hasOwnProperty(_id)) {
                        const convObj = conversation[_id];
                        arr.push(convObj)
                    }
                }
            }
        }
        return arr
    }

    addConversation (conversation: Conversation) {
        this.conversations.push({
            [conversation._id]: new Conversation(conversation)
        })
    }
    
    removeConversation (conversationId): void {
        delete this.conversations[conversationId]
    }
    getLastMessage (conversationId): IMessage {
        const conversation = this.findById(conversationId)        
        return conversation.messages[conversation.messages.length - 1] 
    }
    getMessages (conversationId): Array<any> {
        const currentConvo = this.findById(conversationId)     
        return currentConvo.getMessages()
    }

    findById ( conversationId ): Conversation {
        
        // tslint:disable-next-line:forin
        for (const key in this.conversations) {
            const conversation = this.conversations[key]
            if (conversation.hasOwnProperty(conversationId)) {
                return conversation[conversationId]
            }
        }  
        return null
    }
    
}
export interface IMessage {
    _id: string
    content: string
    updatedAt: string | moment.Moment
    createdAt: string | moment.Moment
    owner: Owner
}
export class Message implements IMessage {
    public _id: string
    public content: string
    public owner: Owner
    public updatedAt: moment.Moment
    public createdAt: moment.Moment

    constructor (message) {
        this._id = message._id
        this.content = message.content
        this.owner = new Owner (message.owner)
        this.updatedAt = moment(message.updatedAt)
        this.createdAt = moment(message.createdAt)
    }
}

export interface IConversation {
    _id: string
    updatedAt: string
    createdAt: string
    name: string
    messages: [IMessage]
    lastMessage: IMessage
    participants: [Object]
    status: number
}
export class Conversation implements IConversation  {
    public _id: string
    public updatedAt: string
    public createdAt: string
    public name: string
    public participants: [Object]
    public messages: [IMessage]
    public lastMessage: IMessage
    public status: number
    public noMoreMessages: boolean
    
    constructor (conversation: IConversation) { 
        this._id = conversation._id
        this.name = conversation.name
        this.updatedAt = conversation.updatedAt
        this.participants = conversation.participants
        this.createdAt = conversation.createdAt
        this.messages = conversation.messages
        this.lastMessage = conversation.lastMessage
        this.status = conversation.status
    }

    static createFromInitState (data: {status: number, conversation: IConversation}) {
        const convo = data.conversation
        const lastMessage = convo.messages.length && new Message(convo.messages[0])
        return new Conversation({
            _id: convo._id,
            name: convo.name,
            updatedAt: convo.updatedAt,
            createdAt: convo.updatedAt,
            messages: [lastMessage],
            lastMessage: lastMessage,
            status: data.status,
            participants: convo.participants
        })
    }
    
    getLastMessage (): IMessage {
        return this.lastMessage
    }

    getFirstMessage (): IMessage {
        return this.messages.length ? this.messages[0] : null
    }
    
    getMessages (): [IMessage] {
        return this.messages
    }
    setAll (msg): void {}
    
    pushMessage (msg: IMessage): IMessage {
        const message =  new Message(msg)
        this.messages.push(message)
        this.lastMessage = message
        return msg
    }
    unshiftMessages (msgs: [IMessage]): IMessage {
        this.messages.unshift(...msgs)
        return msgs[0]
    }
}

export interface IOwner {
    _id: number
    username: string
    email: string
    fullname: string
}

export class Owner {
    public _id: number
    public username: string
    public email: string
    public fullname: string

    constructor (owner: IOwner) {
        this._id = owner._id
        this.username = owner.username
        this.email = owner.email
        this.fullname = owner.fullname
    }
}

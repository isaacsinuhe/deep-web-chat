import { Injectable } from '@angular/core'
import * as moment from 'moment'

export class Conversations {
    private conversations: Object[]
    private userId: string

    static createFromInitState (response) {
        const conversationsMap = {},
            conversationList = []

        response.conversations.forEach(conversation => {       
            conversation.status = response.status
            
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
    }

    getAll (): any[] {
        return this.conversations
    }

    addConversation (conversation: Conversation) {
        try {
            Object.defineProperty(
                this.conversations, 
                conversation._id, 
                {value: new Conversation(conversation)}
            )
        } catch (error) {
            console.error('couln`t add the conversation', error)
        }
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
export class Message implements IMessage{
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
    status: number
}
export class Conversation implements IConversation{
    public _id: string
    public updatedAt: string
    public createdAt: string
    public name: string
    public messages: [IMessage]
    public lastMessage: IMessage
    public status: number
    public noMoreMessages: boolean
    
    constructor (conversation: IConversation) { 
        this._id = conversation._id
        this.name = conversation.name
        this.updatedAt = conversation.updatedAt
        this.createdAt = conversation.createdAt
        this.messages = conversation.messages
        this.lastMessage = conversation.lastMessage
    }

    static createFromInitState (data: {status: number, conversation: IConversation}) {
        const convo = data.conversation
        const lastMessage = new Message(data.conversation.messages[0])
        return new Conversation({
            _id: convo._id,
            name: convo.name,
            updatedAt: convo.updatedAt,
            createdAt: convo.updatedAt,
            messages: [lastMessage],
            lastMessage: lastMessage,
            status: data.status
        })
    }
    
    getLastMessage (): IMessage {
        return this.lastMessage
    }

    getFirstMessage (): IMessage {
        return this.messages[0]
    }
    
    getMessages (): [IMessage] {
        return this.messages
    }
    setAll (msg): void {}
    
    pushMessage (msg: IMessage): IMessage { 
        this.messages.push(new Message(msg))
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

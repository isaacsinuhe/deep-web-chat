import { io, chatSocket, userSocket} from './app'
import * as socket from 'socket.io'

export function socketEvents () {
    
    io.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log('theres a message ' , msg)
        })
        socket.emit('msg', 'onConnection from default socket:' + socket.id)
    })
    
    chatSocket.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log('theres a message ' , msg)
        })
        
        socket.on('joinRoom', (room) => {
            console.log('aaaaaa' + room + ' joined')
            socket.join(room)
            socket.emit('msg', 'chat, after joining room: ' + room)
        })
        
        socket.emit('msg', 'onConnection from chat/ socket: ' + socket.id)
    })
    
    userSocket.on('connection', (socket) => {
        
        socket.on('message', (msg) => {
            console.log('theres a message ' , msg)
        })
        
        socket.on('joinRoom', (room) => {
            console.log('joining user socket ' + room + 'joined')
            socket.join(room)
            socket.emit('msg', 'user, after joining the room: ' + room)
        })
        socket.emit('msg', 'onConnection from user/ socket: ' + socket.id)
    })
}

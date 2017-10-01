import { io, chat} from './app'
import * as socket from 'socket.io'

export function socketEvents () {
    
    io.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log('theres a message ' , msg)
        })
        socket.emit('msg', 'message from ' + socket.id)
    })
    
    chat.on('connection', (socket) => {
        socket.on('message', (msg) => {
            console.log('theres a message ' , msg)
        })

        socket.on('joinRoom', (room) => {
            console.log('aaaaaa' + room + ' joined')
            socket.join(room)
            socket.emit('msg', 'here after joining room ' + room)
        })

        socket.emit('msg', 'message from ' + socket.id)
    })
}

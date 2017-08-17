export class User {
    username
    email
    password
    fullname
    constructor (user) {
        this.username = user.username
        this.email = user.email
        this.password = user.password
        this.fullname = user.fullname
    }
}


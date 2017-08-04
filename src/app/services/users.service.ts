import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  constructor() { }
  create (user?: IUser) {
    return new User(user)
  }
  retrieve (user: IUser) {
    return new User(user)
  }
  delete (user: IUser) {
    return new User(user)
  }
  update (user: IUser) {
    return new User(user)
  }
}

class User implements IUser {
  public _id
  public userID
  public password
  public name
  public email
  public avatar
  constructor (private user: IUser) {

  }
}

export interface IUser {
  _id?: string
  username?: string
  password?: string
  name?: string
  email?: string
  avatar?: any
}

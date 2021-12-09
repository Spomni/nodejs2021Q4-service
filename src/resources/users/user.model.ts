import {
  IUserModel,
  IUserToStore,
  IUserToSend,
  IUserToCreate,
} from "../../contract/resources/user.contract";

const { v4: uuid } = require('uuid');

export class User implements IUserModel {

  id: string

  name: string

  login: string

  password: string

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  toStorage(): IUserToStore {
    const { id, name, login, password } = this
    return { id, name, login, password }
  }

  toResponse(): IUserToSend {
    return User.toResponse(this)
  }

  static toResponse(user: IUserModel): IUserToSend {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static create(user: IUserToCreate) {
    return new User(user)
  }
}

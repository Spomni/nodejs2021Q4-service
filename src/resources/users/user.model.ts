import {
  IUserModel,
  IUserToStore,
  IUserToSend,
  IUserToCreate,
} from "../../contract/resources/user.contract";

const { v4: uuid } = require('uuid');

/**
 * Model to represent a board
 */
export class User implements IUserModel {

  id: string

  name: string

  login: string

  password: string

  /**
   * Construct a new User instance
   *
   * @param userlike - an object to construct a user
   */
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

  /**
   * Transform this instance to an object that can be stored
   *
   * @returns user to store
   */
  toStorage(): IUserToStore {
    const { id, name, login, password } = this
    return { id, name, login, password }
  }

  /**
   * Transform this instance to an object that can be sended
   *
   * @returns user to send
   */
  toResponse(): IUserToSend {
    return User.toResponse(this)
  }

  /**
   * Transform passed user to object that can be sended to user
   *
   * @param user - user to transform
   *
   * @returns user to send
   */
  static toResponse(user: IUserModel): IUserToSend {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * Create a new User instance
   *
   * @param user - an object to construct a user
   */
  static create(user: IUserToCreate) {
    return new User(user)
  }
}

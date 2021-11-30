const { v4: uuid } = require('uuid');

class User {
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
  
  toStorage() {
    const { id, name, login, password } = this
    return { id, name, login, password }
  }

  toResponse() {
    return User.toResponse(this)
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
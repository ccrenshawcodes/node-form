class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, userEmail, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, userEmail, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, userEmail, age, bio }) {
    this.storage[id] = { id, firstName, lastName, userEmail, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();

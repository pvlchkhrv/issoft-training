import { storage } from "../Storage.js";

export class UserAdapter {
  setUsers(users) {
    storage.setItem("users", JSON.stringify(users));
  }

  getUsers() {
    const users = JSON.parse(storage.getItem("users"));
    if (users) {
      return users;
    } else {
      this.setUsers({});
      this.getUsers();
    }
  }

  setUser(email, user) {
    debugger;
    const users = this.getUsers();
    users[email] = user;
    this.setUsers(users);
  }

  getUser(email) {
    const users = this.getUsers();
    const user = users[email];
    if (user) {
      return user;
    }
  }
  return;
}

export const userStorageAdapter = new UserAdapter();

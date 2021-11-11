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
    }
  }

  setUser(user) {
    const users = this.getUsers();
    users[user.email] = user;
    this.setUsers(users);
  }

  getUser(email) {
    const users = this.getUsers();
    const user = users[email];
    if (user) {
      return user;
    }
    return;
  }

  // updateUser(email, updatedUser) {
  //   const users = this.getUsers();
  // }
}

export const userStorageAdapter = new UserAdapter();

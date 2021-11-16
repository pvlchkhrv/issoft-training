class Storage {
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  // updateItem(key, newValue) {
  //   this.setItem(key, newValue);
  // }

  // deleteItem() {}
}

export const storage = new Storage();

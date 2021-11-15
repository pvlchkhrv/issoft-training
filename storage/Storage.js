class Storage {
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  updateItem() {}

  deleteItem() {}
}

export const storage = new Storage();

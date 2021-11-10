class Storage {
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    const item = localStorage.getItem(key);
    return item;
  }

  updateItem() {}

  deleteItem() {}
}

export const storage = new Storage();

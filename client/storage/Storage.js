class Storage {
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return localStorage.getItem(key);
  }
}

export const storage = new Storage();

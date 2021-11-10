class Storage {
  setItem(key, value) {
    debugger;
    localStorage.setItem(key, value);
  }

  getItem(key) {
    debugger;
    const item = localStorage.getItem(key);
    return item;
  }

  updateItem() {}

  deleteItem() {}
}

export const storage = new Storage();

const users = {
  "pavel-ch@tut.by": {
    name: "",
    password: "zaebal",
    avatarUrl: "",
  },
  "borya@tut.by": {
    name: "",
    password: "dsfdfsdf",
    avatarUrl: "",
  },
};

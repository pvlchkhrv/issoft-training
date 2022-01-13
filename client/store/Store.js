class Store {
  constructor(rootReducer, initialState) {
    this.state = rootReducer()
  }
}

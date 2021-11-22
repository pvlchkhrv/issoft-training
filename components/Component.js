export class Component {
  constructor(props, children) {
    this.$component;
    this.props = props;
    this.children = children;
  }

  get html() {
    return this.$component;
  }

  render() {
    this.children &&
      this.children.forEach((child) => {
        this.$component.append(child);
      });
  }

  destroy() {
    this.$component.remove();
  }
}

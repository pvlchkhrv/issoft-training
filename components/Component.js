export class Component {
  constructor(props, children) {
    this.$component = null;
    this.props = props ? props : null;
    this.children = children ? children : null;
  }

  get html() {
    return this.$component;
  }

  renderChildren() {
    this.children &&
      this.children.forEach((child) => {
        this.$component && this.$component.append(child);
      });
  }

  destroy() {
    this.$component.remove();
  }
}

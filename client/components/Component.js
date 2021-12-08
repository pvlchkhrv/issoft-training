export class Component {
  constructor(props, children) {
    this.$component = {};
    this.props = props ? props : null;
    this.children = children ? children : null;
    this.state = {}
  }

  get html() {
    return this.$component;
  }

  createElement(tag, classes = [], content) {
    const node = document.createElement(tag);
    if (classes.length) {
      node.classList.add(...classes);
    }

    if (content) {
      node.textContent = content;
    }

    return node;
  }

  renderChildren() {
    this.children &&
      this.children.forEach((child) => {
        this.$component.append(child);
      });
  }

  update() {
    this.$component.remove();
  }

  destroy() {
    this.$component.remove();
  }
}

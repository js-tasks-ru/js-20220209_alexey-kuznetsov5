class Tooltip {
  static instance;

  constructor() {
    const instance = Tooltip.instance;
    if (instance) {
      return instance;
    }
    Tooltip.instance = this;
  }

  initialize () {
    document.addEventListener('pointerover', this.pointerOverHandler);
    document.addEventListener('pointerout', this.pointerOutHandler);
  }

  pointerOverHandler = (event) => {
    const tooltipElement = event.target.closest('[data-tooltip]');
    if (tooltipElement) {
      const tooltipText = tooltipElement.dataset.tooltip;
      this.render(event, tooltipText);
      document.addEventListener('pointermove', this.pointerMoveHandler);
    }
  }

  pointerMoveHandler = (event) => {
    const shift = 25;
    this.element.style.left = event.clientX + shift + 'px';
    this.element.style.top = event.clientY + shift + 'px';
  }

  pointerOutHandler = () => {
    this.remove();
    document.removeEventListener('pointermove', this.pointerMoveHandler);
  }

  render(event, text) {
    let tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = text;
    this.element = tooltipElem;
    document.body.append(this.element);

  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.pointerOverHandler);
    document.removeEventListener('pointermove', this.pointerMoveHandler);
    document.removeEventListener('pointerout', this.pointerOutHandler);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;

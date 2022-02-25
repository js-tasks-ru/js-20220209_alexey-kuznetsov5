export default class NotificationMessage {
  static activeNotification;

  constructor(message,{
    duration = 20000,
    type = 'success'
  } = {}) {

    this.message = message;
    this.durationInSecond = (duration / 1000) + 's';
    this.duration = duration;
    this.type = type;
    this.render();
  }

  get template() {
    return `
    <div class="notification ${this.type}" style="--value:${this.durationInSecond}">
      <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
            <div class="notification-body">
              ${this.message}
            </div>
        </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    NotificationMessage.activeNotification = this.element;
  }

  show(parent = document.body){
    parent.append(this.element);
    setTimeout(() => {
      this.remove();
    }, this.duration)
  }
  
  remove(){
    this.element.remove();
  }

  destroy(){
    this.remove();
  }
  
}
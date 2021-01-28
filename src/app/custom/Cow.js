import gsap from 'gsap';
import EventEmitter from 'eventemitter3';

export default class Cow extends EventEmitter {
  constructor(_cowElement) {
    super();
    this._cowElement = _cowElement;
  }

  static get events() {
    return {
      ABDUCT_COMPLETE: 'abduct_completed',
    };
  }

  async moveTo() {
    await gsap.to(this._cowElement, {
      y: -390,
      id: 'cowAbduction',
      duration: 3,
    });
    this.emit(Cow.events.ABDUCT_COMPLETE);
  }
  async hide() {
    await gsap.to(this._cowElement, { opacity: 0, id: 'cowHide' });
  }
}

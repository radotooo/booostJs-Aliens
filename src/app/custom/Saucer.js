import gsap from 'gsap';
import EventEmitter from 'eventemitter3';

export default class Saucer extends EventEmitter {
  constructor(
    _saucerElement,
    _beamTopElement = null,
    _beamBottomElement = null
  ) {
    super();
    this._saucerElement = _saucerElement;
    this._beamTopElement = _beamTopElement;
    this._beamBottomElement = _beamBottomElement;
  }

  async moveTo(condition) {
    const x = condition === 'in' ? -835 : -1800;
    const id = condition === 'in' ? 'flyIn' : 'flyOut';
    const eventData =
      condition === 'in' ? Saucer.events.FLY_IN : Saucer.events.FLY_AWAY;

    await gsap.to(this._saucerElement, {
      x,
      id,
      ease: 'power3.in',
      duration: 2,
    });
    this.emit(eventData);
  }

  async toggleBeam(condition) {
    const animation = gsap.timeline();
    const opacity = condition === 'in' ? 0.6 : 0;
    const idTop = condition === 'in' ? 'showTopBeam' : 'hideTopBeam';
    const idBot = condition === 'in' ? 'showBottomBeam' : 'hideBottomBeam';
    const eventData =
      condition === 'in' ? Saucer.events.BAM_SHOW : Saucer.events.BEAM_HIDE;

    await animation
      .to(this._beamTopElement, { duration: 1, id: idTop, opacity }, '')
      .to(this._beamBottomElement, { duration: 1, id: idBot, opacity }, '');
    this.emit(eventData);
  }

  static get events() {
    return {
      FLY_IN: 'fly_in',
      FLY_AWAY: 'fly_away',
      BAM_SHOW: 'beam_showed',
      BEAM_HIDE: 'beam_hide',
    };
  }
}

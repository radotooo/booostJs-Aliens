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
    const x = condition === 'in' ? -837 : -1800;
    const id = condition === 'in' ? 'flyIn' : 'flyOut';

    await gsap.to(this._saucerElement, {
      x,
      id,
      ease: 'power3.inOut',
      duration: 3,
    });
    this.emit(Saucer.events.FLY_IN);
  }

  async toggleBeam(condition) {
    const animation = gsap.timeline();
    const opacity = condition === 'in' ? 0.6 : 0;
    const idTop = condition === 'in' ? 'showTopBeam' : 'hideTopBeam';
    const idBot = condition === 'in' ? 'showBottomBeam' : 'hideBottomBeam';

    const event =
      condition === 'in' ? Saucer.events.BAM_SHOW : Saucer.events.BEAM_HIDE;

    await animation
      .to(this._beamTopElement, { duration: 1.5, id: idTop, opacity }, '')
      .to(this._beamBottomElement, { duration: 1.5, id: idBot, opacity }, '');
    this.emit(event);
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

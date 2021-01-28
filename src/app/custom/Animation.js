import Cow from './Cow';
import Saucer from './Saucer';

export default class Animation {
  constructor() {
    this.saucer = {};
    this.cow = {};
  }

  async gg() {
    await this.cow.moveTo();
  }

  async start() {
    const ufo = document.querySelector('.ufo');
    const beamTop = document.querySelector('#beam-top');
    const beamBot = document.querySelector('#beam-bottom');
    const cowElement = document.querySelector('.cow');

    const saucer = new Saucer(ufo, beamTop, beamBot);
    const cow = new Cow(cowElement);

    this.saucer = saucer;
    this.cow = cow;

    await this.saucer.moveTo('in');
    await this.saucer.toggleBeam('in');
    await this.cow.moveTo();
    await this.cow.hide();
    await this.saucer.toggleBeam('out');
    await this.saucer.moveTo('out');
  }
}

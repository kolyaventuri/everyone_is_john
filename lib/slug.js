import Chance from 'chance';

export default class Slug {
  static random() {
    const chance = new Chance();

    const prefix = chance.prefix({full: true});
    const animal = chance.animal();
    const country = chance.country({full: true}).replace(/ /g, '');

    return `${prefix}${animal}Of${country}`;
  }
}

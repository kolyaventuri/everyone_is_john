export default class PlayerStat {
  constructor() {
    this._points = 0;
    this._willpower = 10;

    this._goal = null;
    this._goalLevel = 1;

    this._skills = [];
    this._skillsFrozen = false;
  }

  freezeSkills() {
    this._skillsFrozen = true;
  }

  unfreezeSkills() {
    this._skillsFrozen = false;
  }

  setSkill(number, value) {
    if (!value || this._skillsFrozen) {
      return;
    }

    number = Number.parseInt(number, 10);
    if (!Number.isFinite(number) || Number.isNaN(number)) {
      throw new TypeError('Skill number must be a number.');
    }

    if (number < 1 || number > 3) {
      throw new Error('Out of bounds skill number.');
    }

    this._skills[number - 1] = value;

    if (number === 3) {
      this.willpower -= 3;
    }
  }

  get points() {
    return this._points;
  }

  get willpower() {
    return this._willpower;
  }

  set willpower(value) {
    this._willpower = value;
  }

  get goal() {
    return this._goal;
  }

  set goal(value) {
    this._goal = value;
  }

  get goalLevel() {
    return this._goalLevel;
  }

  set goalLevel(value) {
    value = Number.parseInt(value, 10);
    if (!Number.isFinite(value) || Number.isNaN(value)) {
      throw new TypeError('Goal value must be a number.');
    }

    if (value < 1 || value > 3) {
      throw new Error('Goal value out of bounds.');
    }

    this._goalLevel = value;
  }

  get skills() {
    return this._skills;
  }
}

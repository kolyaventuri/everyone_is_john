export default class PlayerStat {
  constructor() {
    this._points = 0;
    this._willpower = 10;

    this._goal = null;
    this._goalLevel = 1;

    this._skills = [];
  }

  addSkill(value) {
    if (!value) {
      return;
    }

    if (this._skills.length === 3) {
      throw new Error('Maximum of 3 skills reached.');
    }

    this._skills.push(value);
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

export default class Color {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  calculateValue = (index, percentage) => {
    const start = this.start[index];
    const end = this.end[index];

    const delta = end - start;

    return start + (delta * percentage);
  };

  calculate(percentage) {
    const hue = this.calculateValue(0, percentage);
    const saturation = this.calculateValue(1, percentage);
    const light = this.calculateValue(2, percentage);

    return [hue, saturation, light];
  }
}

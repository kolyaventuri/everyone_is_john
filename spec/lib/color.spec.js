import Color from '../../src/lib/color';

describe('Color', () => {
  let color;
  let start;
  let end;

  beforeEach(() => {
    start = [120, 100, 50];
    end = [0, 0, 75];

    color = new Color(
      start,
      end
    );
  });

  test('has a start and end color', () => {
    expect(color.start).toEqual(start);
    expect(color.end).toEqual(end);
  });

  describe('.calculate', () => {
    test('can calculate steps by percentage', () => {
      let _color = color.calculate(0);
      expect(_color).toEqual([120, 100, 50]);

      _color = color.calculate(0.25);
      expect(_color).toEqual([90, 75, 56.25]);

      _color = color.calculate(0.5);
      expect(_color).toEqual([60, 50, 62.5]);

      _color = color.calculate(0.75);
      expect(_color).toEqual([30, 25, 68.75]);

      _color = color.calculate(1);
      expect(_color).toEqual([0, 0, 75]);
    });
  });
});

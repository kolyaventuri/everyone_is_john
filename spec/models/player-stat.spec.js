import PlayerStat from '../../models/player-stat';

describe('PlayerStat', () => {
  let stat = null;

  beforeEach(() => {
    stat = new PlayerStat();
  });

  test('has a point value', () => {
    expect(stat.points).toEqual(0);
  });

  test('has a willpower level', () => {
    expect(stat.willpower).toEqual(10);
  });

  test('can add willpower', () => {
    stat.willpower += 1;

    expect(stat.willpower).toEqual(11);
  });

  test('can subtract willpower', () => {
    stat.willpower -= 1;

    expect(stat.willpower).toEqual(9);
  });

  test('can have a goal', () => {
    const goal = 'Goal';

    expect(stat.goal).toBeNull();

    stat.goal = goal;

    expect(stat.goal).toEqual(goal);
  });

  test('goal can have a point value in [1 - 3]', () => {
    stat.goalLevel = 1;
    expect(stat.goalLevel).toEqual(1);

    stat.goalLevel = 2;
    expect(stat.goalLevel).toEqual(2);

    stat.goalLevel = 3;
    expect(stat.goalLevel).toEqual(3);

    const fn = () => {
      stat.goalLevel = 0;
    };

    expect(fn).toThrow('Goal value out of bounds');

    const fn2 = () => {
      stat.goalLevel = 4;
    };

    expect(fn2).toThrow('Goal value out of bounds.');
  });

  test('goal value must be a number', () => {
    const fn3 = () => {
      stat.goalLevel = 'soup';
    };

    expect(fn3).toThrow(new TypeError('Goal value must be a number.'));
  });

  test('can have up to 3 skills', () => {
    expect(stat.skills).toBeInstanceOf(Array);

    expect(stat.skills).toHaveLength(0);

    stat.addSkill('a');
    expect(stat.skills).toHaveLength(1);

    stat.addSkill('b');
    expect(stat.skills).toHaveLength(2);

    stat.addSkill('b');
    expect(stat.skills).toHaveLength(3);

    const fn = () => {
      stat.addSkill('d');
    };

    expect(fn).toThrow('Maximum of 3 skills reached.');
  });

  test('cannot have undefined or null skill', () => {
    stat.addSkill();
    stat.addSkill(null);

    expect(stat.skills).toHaveLength(0);
  });

  test('can freeze skills', () => {
    stat.addSkill('a');

    expect(stat.skills).toHaveLength(1);

    stat.freezeSkills();

    stat.addSkill('b');

    expect(stat.skills).toHaveLength(1);
  });

  test('can unfreeze skills', () => {
    stat.freezeSkills();

    stat.unfreezeSkills();

    stat.addSkill('a');

    expect(stat.skills).toHaveLength(1);
  });
});

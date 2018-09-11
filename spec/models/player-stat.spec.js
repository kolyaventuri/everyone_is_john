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

  test('can set the 3 skills', () => {
    stat.setSkill(1, 'a');
    stat.setSkill(2, 'b');
    stat.setSkill(3, 'c');

    expect(stat.skills).toEqual(['a', 'b', 'c']);
  });

  test('cannot set out of bounds skill', () => {
    const fn = () => {
      stat.setSkill(0, 'a');
    };

    const fn2 = () => {
      stat.setSkill(4, 'a');
    };

    expect(fn).toThrow('Out of bounds skill number.');
    expect(fn2).toThrow('Out of bounds skill number.');
  });

  test('skill number must be a number', () => {
    const fn = () => {
      stat.setSkill('a', 'b');
    };

    expect(fn).toThrow(new TypeError('Skill number must be a number.'));
  });

  test('cannot have undefined or null skill', () => {
    stat.setSkill(1);
    stat.setSkill(2, null);

    expect(stat.skills[0]).toBeUndefined();
    expect(stat.skills[1]).toBeUndefined();
  });

  test('can freeze skills', () => {
    stat.setSkill(1, 'a');

    expect(stat.skills).toHaveLength(1);

    stat.freezeSkills();

    stat.setSkill(2, 'b');

    expect(stat.skills).toHaveLength(1);
  });

  test('can unfreeze skills', () => {
    stat.freezeSkills();

    stat.unfreezeSkills();

    stat.setSkill(1, 'a');

    expect(stat.skills[0]).toBeDefined();
  });
});

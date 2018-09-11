import Repository from '../../services/repository';

class Foo {
  constructor(id) {
    this.id = id;
  }
}

describe('Repository', () => {
  let repo = null;

  beforeEach(() => {
    repo = new Repository();
  });

  test('can have objects added to it', () => {
    repo.insert(new Foo());

    expect(repo.count).toEqual(1);
  });

  test('disallows duplicate objects', () => {
    const foo = new Foo();

    repo.insert(foo);

    const fn = () => {
      repo.insert(foo);
    };

    expect(fn).toThrow('Foo already exists.');

    expect(repo.count).toEqual(1);
  });

  test('can find specific object', () => {
    const foo = new Foo('a');
    const foo2 = new Foo('b');

    repo.insert(foo);
    repo.insert(foo2);

    const result = repo.find('b');

    expect(result).toBeInstanceOf(Foo);
    expect(result.id).toEqual(foo2.id);
  });

  test('can be cleared', () => {
    const foo = new Foo('a');
    const foo2 = new Foo('b');

    repo.insert(foo);
    repo.insert(foo2);

    expect(repo.count).toEqual(2);

    repo.clear();

    expect(repo.count).toEqual(0);
  });

  test('can destroy object', () => {
    const foo = new Foo('a');
    const foo2 = new Foo('b');

    repo.insert(foo);
    repo.insert(foo2);

    repo.destroy(foo);

    expect(repo.count).toEqual(1);

    expect(repo.find('a')).toBeUndefined();
    expect(repo.find('b')).toBe(foo2);
  });
});

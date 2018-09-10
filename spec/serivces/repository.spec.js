import Repository from '../../services/repository';

class Foo {}

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
});

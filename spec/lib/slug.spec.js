import Slug from '../../lib/slug';

describe('Slug', () => {
  test('.random() generates a slug', () => {
    const result = Slug.random();

    expect(result).toEqual(expect.any(String));
  });
});

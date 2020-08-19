import {
  viewportIsDesktop,
  viewportIsPhone,
  viewportIsTablet,
} from '../actions';

describe('viewport actions', () => {
  describe('viewportIsDesktop', () => {
    it('should return the correct type', () => {
      const result = viewportIsDesktop();
      const expected = { type: 'VIEWPORT_IS_DESKTOP' };
      expect(result).toEqual(expected);
    });
  });

  describe('viewportIsPhone', () => {
    it('should return the correct type', () => {
      const result = viewportIsPhone();
      const expected = { type: 'VIEWPORT_IS_PHONE' };
      expect(result).toEqual(expected);
    });
  });

  describe('viewportIsTablet', () => {
    it('should return the correct type', () => {
      const result = viewportIsTablet();
      const expected = { type: 'VIEWPORT_IS_TABLET' };
      expect(result).toEqual(expected);
    });
  });
});

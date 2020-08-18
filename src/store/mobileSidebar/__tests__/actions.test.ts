import { openMobileSidebar, closeMobileSidebar } from '../actions';

describe('mobileSidebar actions', () => {
  describe('openMobileSidebar', () => {
    it('should return the correct type', () => {
      const result = openMobileSidebar();
      const expected = { type: 'OPEN_MOBILE_SIDEBAR' };
      expect(result).toEqual(expected);
    });
  });

  describe('closeMobileSidebar', () => {
    it('should return the correct type', () => {
      const result = closeMobileSidebar();
      const expected = { type: 'CLOSE_MOBILE_SIDEBAR' };
      expect(result).toEqual(expected);
    });
  });
});

import { printFormattedDate, getTime } from '../dateTime';

describe('dateTime', () => {
  describe('printFormattedDate', () => {
    it('should return "Today"', () => {
      const isoString = new Date().toISOString();
      const result = printFormattedDate(isoString);
      expect(result).toBe('Today');
    });

    it('should return "Yesterday"', () => {
      const date = new Date();
      date.setHours(-24);
      const result = printFormattedDate(date.toISOString());
      expect(result).toBe('Yesterday');
    });

    it('should return "day, month date"', () => {
      const date = '2020-03-22T16:48:04.892Z';
      const result = printFormattedDate(date);
      expect(result).toBe('Sunday, March 22th');
    });

    it('should return "month date, year"', () => {
      const date = '2019-03-22T16:48:04.892Z';
      const result = printFormattedDate(date);
      expect(result).toBe('March 22th, 2019');
    });
  });

  describe('getTime', () => {
    it('should return "hour:minutes AM"', () => {
      const date = '2020-08-22T17:01:32.677Z';
      const result = getTime(date);
      expect(result).toBe('10:01 AM');
    });

    it('should return "hour:minutes PM"', () => {
      const date = '2020-08-22T19:01:32.677Z';
      const result = getTime(date);
      expect(result).toBe('12:01 PM');
    });

    it('should return "hour:minutes"', () => {
      const date = '2020-08-22T19:01:32.677Z';
      const result = getTime(date, false);
      expect(result).toBe('12:01');
    });
  });
});

import convertToClosestMs from './conversions';

describe('convertToClosestMs', () => {
  it('should convert to closest milliseconds', () => {
    expect(convertToClosestMs(1.723131)).toBe(1.72);
    expect(convertToClosestMs(1.57322)).toBe(1.57);
    expect(convertToClosestMs(1.999)).toBe(2);
  });
});

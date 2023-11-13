import Date from './../src/models/Date.js';

describe('Date Test', () => {
  test('숫자가 아닌 인자가 들어오면 에러를 던진다.', () => {
    const nonIntegerDate = 'invalid';
    expect(() => new Date(nonIntegerDate)).toThrowError('[ERROR]');
  });

  test('31 초과 숫자가 들어오면 에러를 던진다.', () => {
    const invalidDate = 32;
    expect(() => new Date(invalidDate)).toThrowError('[ERROR]');
  });

  test('1 미만 숫자가 들어오면 에러를 던진다.', () => {
    const invalidDate = 0;
    expect(() => new Date(invalidDate)).toThrowError('[ERROR]');
  });

  test('1-31 범위 안에 숫자가 들어오면 정상적으로 출력되어야한다.', () => {
    const validDate = 15;
    const dateObject = new Date(validDate);
    expect(dateObject.getDate()).toBe(validDate);
  });
});

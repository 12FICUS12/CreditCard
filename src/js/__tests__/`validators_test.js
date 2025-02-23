import isValidLuhn from '../validators';

test.each([
  ['false for >19 digits', '12345000000000000000000', false],
  ['false for <12 digits', '12345000', false],
  ['true for valid Visa', '4571738192641496', true],
  ['true for valid Mastercard', '5105105105105100', true],
  ['false for invalid Visa', '4571738192641490', false],
  ['false for invalid Mastercard', '5105105105105103', false],
  ['false for all zeros', '000000000000', false],
  ['true for valid Amex', '378282246310005', true],
  ['false for invalid Amex', '378282246310002', false],
])(('test %s'), (_, input, expected) => {
  expect(isValidLuhn(input)).toBe(expected);
});
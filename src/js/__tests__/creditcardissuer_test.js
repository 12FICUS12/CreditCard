import creditCardIssuer from '../creditcardissuer';

test.each([
  ['mir for 22', '2221293052254723', 'mir'],
  ['visa for 4*', '4221293052254723', 'visa'],
  ['mastercard for 51', '5121293052254723', 'mastercard'],
  ['american express for 34', '3421293052254723', 'americanexpress'],
  ['discover for 60', '6021293052254723', 'discover'],
  ['jcb for 35', '3521293052254723', 'jcb'],
  ['diners club for 30', '3021293052254723', 'dinersclub'],
  ['false for empty string', '', ''], // проверка на пустую строку
  ['false for invalid visa', '412345678901234567', ''], // в этом случае это просто невалидный номер
  ['false for invalid mastercard', '5123456789012345', ''], // невалидный mastercard
  ['false for unknown issuer', '1234567812345670', ''], // неизвестный эмитент
])(('test %s'), (_, input, expected) => {
  expect(creditCardIssuer(input)).toBe(expected);
});
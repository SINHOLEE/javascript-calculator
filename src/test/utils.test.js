/**
 * @jest-environment jsdom
 */

import { calculate } from '../js/utils.js';

// console.log(calculate('1', '2', '+'));
// console.log(calculate('1', '2', '*'));
// console.log(calculate('1', '2', '/'));
// console.log(calculate('1', '2', '-'));
// console.log(calculate('1', '0', '/'));

// console.log(isEqualOperator('='));
// console.log(isEqualOperator('1'));

// console.log(isAC('ac'));
// console.log(isAC('1'));

// console.log(isNumber('1'));
// console.log(isNumber('ac'));
// console.log(isNumber('='));

// console.log(isOperator('+'));
// console.log(isOperator('-'));
// console.log(isOperator('/'));
// console.log(isOperator('*'));
// console.log(isOperator('1'));
function sum(a, b) {
	return a + b;
}

test('add 1+2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

test('add 2+3 to equal3', () => {
	expect(sum(2, 3)).toBe(5);
});

test(`a가 '1', b가 '2', operator가 '*'일때 값은 '2'`, () => {
	expect(calculate('1', '2', '*')).toBe('2');
});

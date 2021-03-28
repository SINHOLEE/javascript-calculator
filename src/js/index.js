import { calculate } from './utils.js';
import { initState } from './store.js';
const screen = document.querySelector('.result');
const currentOperator = document.querySelector('.current-operator');
const calculatorBody = document.querySelector('.calculator__body');
let state = initState;

const appendNum = (origin, addedValue) => {
	if (origin === '0') {
		return addedValue;
	}
	return origin + addedValue;
};

const resetState = () => {
	return initState;
};

const isAC = (value) => {
	return value === 'ac';
};

const isEqualOperator = (value) => {
	return value === '=';
};
const isNumber = (value) => {
	return '0123456789'.split('').includes(value);
};
const isNumber1 = (value) => {
	return !/\D/.test(value);
};
const isOperator = (value) => {
	return '+-/*'.split('').includes(value);
};
const isOperator1 = (value) => {
	return /[+-\/\*]/.test(value);
};
const numberValidate = (state) => {
	const { firstNum, secondNum, operator } = state;
	if (
		(operator === '' && firstNum.length >= 3) ||
		(isOperator(operator) && secondNum.length >= 3)
	) {
		throw new Error('3자 이상 숫자 입력 못합니다.');
	}
};

const operatorValidate = ({ secondNum }) => {
	if (secondNum.length > 0) {
		throw new Error('한 번에 두가지 이상 연산을 할 수 없습니다.');
	}
};

const equalValidate = ({ firstNum, secondNum, operator }) => {
	if (firstNum === '') {
		throw new Error('첫번째 숫자를 입력해주세요.');
	}
	if (secondNum === '') {
		throw new Error('두번째 숫자를 입력해주세요.');
	}
	if (operator === '') {
		throw new Error('연산자를 입력해주세요.');
	}
};

const render = () => {
	screen.innerHTML = state.result;
	currentOperator.innerHTML = state.operator;
};

// 컨트롤러
const setState = (newState) => {
	// 모델
	state = { ...state, ...newState };
	// 뷰
	render();
};
/**
 * @params a:string b:string operator:string
 * @returns string
 *
 */
const numberGenNewState = (state, value) => {
	const { firstNum, secondNum, operator } = state;
	let newState = {};

	if (operator === '') {
		newState = {
			...state,
			firstNum: appendNum(firstNum, value),
			result: appendNum(firstNum, value),
		};
	} else {
		newState = {
			...state,
			secondNum: appendNum(secondNum, value),
			result: appendNum(secondNum, value),
		};
	}
	return newState;
};

const operatorGenNewState = (state, value) => {
	return {
		...state,
		operator: value,
	};
};

const equalGenNewState = ({ firstNum, secondNum, operator }) => {
	const result = calculate(firstNum, secondNum, operator);
	return {
		...resetState(),
		firstNum: result,
		result,
	};
};

const acGenNewState = () => {
	return resetState();
};

// business logic
/**
 * @params value :string
 * @returns newState: {	result: string,
												operator: string,
												firstNum: string,
												secondNum: string,
												}
*/
const inputAPI = (value) => {
	let newState = {};
	if (isNumber(value)) {
		numberValidate(state);
		newState = numberGenNewState(state, value);
	} else if (isOperator(value)) {
		operatorValidate(state);
		newState = operatorGenNewState(state, value);
	} else if (isAC(value)) {
		newState = acGenNewState();
	} else if (isEqualOperator(value)) {
		equalValidate(state);
		newState = equalGenNewState(state);
	} else {
		throw new Error('받을 수 없는 값을 입력했습니다.');
	}
	return newState;
};

// controller;
const onClickBtn = (e) => {
	const target = e.target;

	const result = target.matches('.btn');
	if (!result) {
		return;
	}
	const clickedBtn = target.dataset.btnType;
	try {
		const newState = inputAPI(clickedBtn);
		setState(newState);
	} catch (error) {
		alert(error.message);
	}
};
calculatorBody.addEventListener('click', onClickBtn);

render();

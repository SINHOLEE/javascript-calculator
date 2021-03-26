const screen = document.querySelector(".result");
const currentOperator = document.querySelector(".current-operator");
const calculatorBody = document.querySelector(".calculator__body");
const initState = Object.freeze({
	result: "0",
	operator: "",
	firstNum: "0",
	secondNum: "",
});
let state = initState;

const resetState = () => {
	state = initState;
};

const render = () => {
	screen.innerHTML = state.result;
	currentOperator.innerHTML = state.operator;
};

const setState = (newState) => {
	state = {...state, ...newState};
	render();
};
/**
 * @params a:string b:string operator:string
 * @returns string
 *
 */
const calculate = (a, b, operator) => {
	let res;
	const aNum = parseInt(a);
	const bNum = parseInt(b);
	switch (operator) {
		case "*":
			res = aNum * bNum;
			break;
		case "-":
			res = aNum - bNum;
			break;
		case "+":
			res = aNum + bNum;
			break;
		case "/":
			if (bNum === 0) {
				alert("0으로 나눌 수 없어요!");
				res = 0;
			} else {
				res = Math.floor(aNum / bNum);
			}
			break;
		default:
			alert("사용할 수 없는 연산입니다.");
			res = 0;
	}
	return res.toString();
};

const isAC = (value) => {
	return value === "ac";
};

const isEqualOperator = (value) => {
	return value === "=";
};
const isNumber = (value) => {
	return "0123456789".split("").includes(value);
};
const isOperator = (value) => {
	return "+-/*".split("").includes(value);
};
const numberValidate = () => {
	const {firstNum, secondNum, operator} = state;
	if (operator === "" && firstNum.length >= 3) {
		throw new Error("3자 이상 숫자 입력 못합니다.");
	}
	if (isOperator(operator) && secondNum.length >= 3) {
		throw new Error("3자 이상 숫자 입력 못합니다.");
	}
};

const appendNum = (origin, addedValue) => {
	if (origin === "0") {
		return addedValue;
	}
	return origin + addedValue;
};
const numberGenNewState = (value) => {
	const {firstNum, secondNum, operator} = state;
	let newState = {};

	if (operator === "") {
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

const operatorValidate = () => {
	const {secondNum} = state;
	if (secondNum.length > 0) {
		throw new Error("한 번에 두가지 이상 연산을 할 수 없습니다.");
	}
};
const operatorGenNewState = (value) => {
	return {
		...state,
		operator: value,
	};
};

const equalValidate = () => {
	const {firstNum, secondNum, operator} = state;
	if (firstNum === "") {
		throw new Error("첫번째 숫자를 입력해주세요.");
	}
	if (secondNum === "") {
		throw new Error("두번째 숫자를 입력해주세요.");
	}
	if (operator === "") {
		throw new Error("연산자를 입력해주세요.");
	}
};

const equalGenNewState = () => {
	const {firstNum, secondNum, operator} = state;

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
const inputAPI = (value) => {
	let newState = {};
	if (isNumber(value)) {
		numberValidate();
		newState = numberGenNewState(value);
	} else if (isOperator(value)) {
		operatorValidate();
		newState = operatorGenNewState(value);
	} else if (isAC(value)) {
		newState = acGenNewState();
	} else if (isEqualOperator(value)) {
		equalValidate();
		newState = equalGenNewState();
	} else {
		throw new Error("받을 수 없는 값을 입력했습니다.");
	}
	setState(newState);
};

// controller
const onClickBtn = (e) => {
	const target = e.target;

	const result = target.matches(".btn");
	if (!result) {
		return;
	}
	const clickedBtn = target.dataset.btnType;
	try {
		inputAPI(clickedBtn);
	} catch (error) {
		alert(error.message);
	}
};
calculatorBody.addEventListener("click", onClickBtn);

render();

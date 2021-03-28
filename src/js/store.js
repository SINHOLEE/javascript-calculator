const initState = Object.freeze({
	result: '0',
	operator: '',
	firstNum: '0',
	secondNum: '',
});

const appendNum = (origin, addedValue) => {
	if (origin === '0') {
		return addedValue;
	}
	return origin + addedValue;
};

/**
 * @params a:string b:string operator:string
 * @returns string
 *
 */
const numberGenNewState = (state, { value }) => {
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
const acGenNewState = (state, action) => {
	return initState;
};

const equalGenNewState = ({ firstNum, secondNum, operator }, action) => {
	const result = calculate(firstNum, secondNum, operator);
	return {
		...resetState(),
		firstNum: result,
		result,
	};
};

const operatorGenNewState = (state, { value }) => {
	return {
		...state,
		operator: value,
	};
};

const methodsMapper = {
	NUMBER_CLICKED: numberGenNewState,
	AC_CLICKED: acGenNewState,
	EQUAL_CLICKED: equalGenNewState,
	OPERATER_CLICKED: operatorGenNewState,
};
// calculateState
const calculateModel = (initState = initState) => (prevState, action) => {
	if (!prevState) {
		return initState;
	}
	const curruntMethod = methodsMapper[action.type];
	if (!curruntMethod) {
		return prevState;
	}
	// action {type:number, value:value}
	return curruntMethod(prevState, action);
};
export { calculateModel };

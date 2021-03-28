import { calculateModel } from './store.js';

export class ScreenView {
	$screen;
	$currentOperator;
	state;
	constructor() {
		this.$screen = document.querySelector('.result');
		this.$currentOperator = document.querySelector('.current-operator');
		this.state = calculateModel();
	}

	render = () => {
		this.$screen.innerHTML = state.result;
		thsi.$currentOperator.innerHTML = state.operator;
	};
}

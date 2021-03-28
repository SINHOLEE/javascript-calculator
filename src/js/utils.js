const calculate = (a, b, operator) => {
	let res;
	const aNum = parseInt(a);
	const bNum = parseInt(b);
	switch (operator) {
		case '*':
			res = aNum * bNum;
			break;
		case '-':
			res = aNum - bNum;
			break;
		case '+':
			res = aNum + bNum;
			break;
		case '/':
			if (bNum === 0) {
				alert('0으로 나눌 수 없어요!');
				res = 0;
			} else {
				res = Math.floor(aNum / bNum);
			}
			break;
		default:
			alert('사용할 수 없는 연산입니다.');
			res = 0;
	}
	return res.toString();
};

export { calculate };

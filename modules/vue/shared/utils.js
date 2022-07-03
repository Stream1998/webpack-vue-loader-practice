const regFnArgs = /^(.*?)\((.*?)\)/;
// TODO ""
const regArgsStr = /\'(.*?)\'/;

export function getFirstChildNode(node) {
	const childNodes = node.childNodes;

	for (let i = 0; i < childNodes.length; i++) {
		if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
			return childNodes[i];
		}
	}
}

export function checkExprHasData(data, expr) {
	for (let key in data) {
		if (expr.includes(key) && expr !== key) {
			return {
				key,
				expression: expr
			}
		}
		if (expr === key) {
			return {
				key,
				expression: key
			}
		}
	}
}

export function checkFnHasArgs(str) {
	const matched = str.match(regFnArgs);
	if (matched) {
		const argsArr = matched[2].split(',');
		const args = argsArr.map(v => (checkArgs(v) ? v : Number(v)));

		return {
			name: matched[1],
			args
		}
	}
}

export function checkArgs(str) {
	return str.match(regArgsStr, str)
}
import { checkExprHasData, checkFnHasArgs } from "./shared/utils";
import { vEvent } from "./shared/propTypes";

export const eventPool = new Map();
export const exprPool = new Map();

const regExpr = /\{\{(.*?)\}\}/;

export default function (vm, methods) {
	const { $node, $data, } = vm;
	const allNodes = $node.querySelectorAll('*');
	const { vClick } = vEvent;
	allNodes.forEach(node => {
		const expr = node.textContent;
		const exprMatched = expr.match(regExpr);
		const vClickVal = node.getAttribute(`@${vClick}`);

		if (exprMatched) {
			const pollInfo = checkExprHasData($data, exprMatched[1].trim());
			pollInfo && exprPool.set(node, pollInfo);
		}

		if (vClickVal) {
			const fnInfo = checkFnHasArgs(vClickVal);
			const handler = fnInfo
				? methods[fnInfo.name].bind(vm, ...fnInfo.args)
				: methods[vClickVal].bind(vm);
			eventPool.set(node, {
				type: vClick,
				handler
			})
			node.removeAttribute(`@${vClick}`);
		}
	})
}
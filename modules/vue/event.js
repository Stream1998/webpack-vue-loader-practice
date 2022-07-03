import { eventPool } from "./pools";

export default function (vm) {
	for (let [node, { type, handler }] of eventPool) {
		vm[handler.name] = handler;
		node.addEventListener(type, vm[handler.name], false);
	}
}
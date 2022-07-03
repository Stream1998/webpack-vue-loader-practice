import { getFirstChildNode } from "./shared/utils";
import reactive from "./reactive";
import pools from "./pools";
import event from "./event";
import { render } from "./render";

const vue = {
	createApp,
}
function mount(el) {
	document.querySelector(el).appendChild(this.$node);
}

function createApp(component) {
	const vm = {};

	const {
		template,
		methods,
		data,
	} = component;
	vm.$node = createNode(template);
	vm.mount = mount;

	const init = () => {
		reactive(vm, data);
		pools(vm, methods);
		event(vm)
		render(vm);
	}
	init();
	return vm;
}

function createNode(template) {
	const _template = document.createElement('div');
	_template.innerHTML = template;
	return getFirstChildNode(_template);
}

export {
	createApp,
}
export default vue;
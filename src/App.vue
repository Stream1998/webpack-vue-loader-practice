<template>
	<div>
		<h1>{{ count + 1}}</h1>
		<h1>{{ count + 2}}</h1>
		<button @click="plus(1)">+</button>
		<button @click="minus(1)">-</button>
		<button @click="plus100">plus100</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			count: 1,
		}
	},
	methods:{
		plus(num) {
			this.count += num;
		},
		minus(num) {
			this.count -= num;
		},
		plus100() {
			this.count += 100;
		}
	}
}
</script>
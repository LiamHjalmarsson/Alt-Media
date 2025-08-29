<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string | number }>();

function handleInput(e: Event) {
	const target = e.target as HTMLInputElement;

	if (!target) {
		return;
	}

	emit("update:modelValue", target.value);
}
</script>

<template>
	<input
		v-bind="$attrs"
		:value="modelValue"
		@input="handleInput"
		:class="[
			'w-full py-xs px-sm rounded-lg outline-none backdrop-blur-lg transition shadow-xl bg-light/20 border-light/5 border',
		]" />
</template>

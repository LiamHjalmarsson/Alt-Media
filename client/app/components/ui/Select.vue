<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string | number }>();

function handleSelect(e: Event) {
	const target = e.target as HTMLSelectElement;

	if (!target) {
		return;
	}

	emit("update:modelValue", target.value);
}
</script>

<template>
	<select
		v-bind="$attrs"
		:value="modelValue"
		@change="handleSelect"
		class="w-full py-xs px-sm rounded-lg border border-light/10 bg-light/20 outline-none backdrop-blur-lg transition">
		<slot />
	</select>
</template>

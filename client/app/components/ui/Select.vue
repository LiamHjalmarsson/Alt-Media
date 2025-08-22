<script setup>
defineEmits(["update:modelValue"]);

defineProps({ modelValue: [String, Number] });
</script>

<template>
	<select
		v-bind="$attrs"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
		class="w-full py-xs px-sm rounded-lg border border-light/10 bg-light/20 outline-none backdrop-blur-lg focus:border-light/40 focus-visible:ring-primary/50 transition">
		<slot />
	</select>
</template>

<script setup>
defineEmits(["update:modelValue"]);

defineProps({ modelValue: [String, Number] });
</script>

<template>
	<input
		v-bind="$attrs"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
		class="w-full py-xs px-sm rounded-lg border border-light/10 bg-light/20 placeholder-light/50 outline-none backdrop-blur-lg focus:border-light/40 focus-visible:ring-primary/50 transition" />
</template>

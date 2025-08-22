<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps<{ modelValue?: string }>();
</script>

<template>
	<textarea
		v-bind="$attrs"
		:value="modelValue"
		@input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
		class="w-full rounded-lg border border-light/10 bg-light/20 py-xs px-sm text-light placeholder-light/50 outline-none backdrop-blur-lg focus:border-light/40 focus-visible:ring-2 focus-visible:ring-primary/50 transition" />
</template>

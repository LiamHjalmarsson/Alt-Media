<script setup lang="ts">
const { required = false } = defineProps<{ required?: boolean }>();
</script>

<template>
	<label v-bind="$attrs" class="text-sm mb-xs block">
		<slot />
		<span v-if="required" aria-hidden="true" class="text-error ml-xxs">*</span>
	</label>
</template>

<script setup lang="ts">
const props = defineProps<{
	url: string;
}>();
</script>

<template>
	<a :href="props.url" class="">
		<slot />
	</a>
</template>

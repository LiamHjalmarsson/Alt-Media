<script setup lang="ts">
import type { Variant } from "~/types/shared";

const { variant = "primary" } = defineProps<{ variant?: Variant }>();

const variantClass = computed(() => {
	switch (variant) {
		case "primary":
			return "bg-primary border-primary text-light hover:bg-primary-hover hover:border-primary-hover";
		case "primary-outline":
			return "bg-transparent border-primary text-primary hover:bg-primary/50 hover:border-primary/50 hover:text-light";
		case "ghost":
			return "bg-transparent text-primary border-transparent";
		default:
			return "";
	}
});
</script>

<template>
	<button
		v-bind="$attrs"
		:class="[
			'inline-block border lg:border-2 font-bold py-xs px-lg rounded-md cursor-pointer transition duration-150',
			variantClass,
		]">
		<slot />
	</button>
</template>

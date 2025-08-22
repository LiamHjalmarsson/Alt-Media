<script setup lang="ts">
import type { Variant } from "~/types/shared";

const {
	to,
	variant = "primary",
	external = false,
} = defineProps<{ to: string; variant?: Variant; external?: boolean }>();

const variantClass = computed(() => {
	switch (variant) {
		case "primary":
			return " py-xs px-lg bg-primary border-primary text-light hover:bg-primary-hover hover:border-primary-hover";
		case "primary-outline":
			return "py-xs px-lg bg-transparent border-primary text-primary hover:bg-primary hover:border-primary hover:text-light";
		case "ghost":
			return "bg-transparent text-primary border-transparent";
		default:
			return "";
	}
});
</script>

<template>
	<NuxtLink
		:to="to || '#services'"
		:target="external ? '_blank' : undefined"
		:class="[
			'inline-block border lg:border-2 font-bold rounded-md cursor-pointer transition duration-150',
			variantClass,
		]">
		<slot />
	</NuxtLink>
</template>

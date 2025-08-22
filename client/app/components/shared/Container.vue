<script setup lang="ts">
import type { Size } from "~/types/shared";

withDefaults(defineProps<{ size?: Size }>(), {
	size: "xl",
});

const sizeClass: Record<Size, string> = {
	"2xs": "max-w-[320px]",
	xs: "max-w-[480px]",
	sm: "max-w-[768px]",
	md: "max-w-[1024px]",
	lg: "max-w-[1200px]",
	xl: "max-w-[1400px]",
	"2xl": "max-w-[1400px]",
};
</script>

<template>
	<div class="mx-auto w-full h-full p-xs xs:p-sm sm:md md:p-lg lg:p-2xl" :class="[sizeClass[size]]">
		<slot />
	</div>
</template>

<script setup lang="ts">
import type { AlignContent } from "~/types/shared";

interface HeadingProps {
	title: string;
	subtitle?: string;
	description?: string;
	alignContent?: AlignContent;
}

const { alignContent } = defineProps<HeadingProps>();

const alignClass = computed(() => {
	if (alignContent === "center") {
		return "text-center";
	}

	if (alignContent === "right") {
		return "text-right";
	}

	return "text-left";
});
</script>

<template>
	<div :class="['', alignClass]">
		<h2
			class="text-heading-md md:text-heading-lg lg:text-heading-xl xl:text-heading-2xl font-semibold tracking-tight">
			{{ title }}
		</h2>
	</div>
</template>

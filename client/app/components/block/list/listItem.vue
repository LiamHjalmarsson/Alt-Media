<script lang="ts" setup>
import type { ListItem } from "~/types/shared";

defineProps<{
	item: ListItem;
	number: number;
}>();
</script>

<template>
	<div>
		<div class="flex items-center">
			<span
				class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-extrabold text-secondary mr-md lg:mr-lg font-heading">
				{{ number }}
			</span>
			<h3 class="text-heading-sm lg:text-heading-md font-semibold first-letter:capitalize truncate">
				{{ item.title }}
			</h3>
		</div>
		<p class="text-md lg:text-lg text-left">
			{{ item.description }}
		</p>
	</div>
</template>

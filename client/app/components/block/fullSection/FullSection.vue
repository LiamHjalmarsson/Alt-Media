<script setup lang="ts">
import type { FullSectionBlock } from "~/types/blocks";

const { block } = defineProps<{ block: FullSectionBlock }>();

const imageUrl = computed(() => (block.cover ? `${block.cover?.url}` : null));
</script>

<template>
	<Section class="h-screen bg-cover bg-center relative bg-bg-dark">
		<NuxtImg
			v-if="imageUrl"
			:src="imageUrl"
			alt=""
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover opacity-10" />

		<div class="text-light relative z-10 max-w-screen-sm lg:max-w-screen-md text-center">
			<h3
				class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl font-bold font-heading text-secondary mb-xs">
				{{ block.title }}
			</h3>

			<p class="text-md lg:text-lg font-medium leading-relaxed">
				{{ block.description }}
			</p>
		</div>
	</Section>
</template>

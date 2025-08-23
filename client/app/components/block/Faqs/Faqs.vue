<script setup lang="ts">
import type { FaqBlock } from "~/types/blocks";

defineProps<{ block: FaqBlock }>();

const activeItemId = ref<number | null>(null);

const toggleAnswer = (id: number) => {
	activeItemId.value = activeItemId.value === id ? null : id;
};
</script>

<template>
	<Section>
		<Container size="sm">
			<Heading :title="block.title" class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" alignContent="center" />
			<ul class="mx-auto w-full">
				<FaqsItem
					v-for="(faq, i) in block.items"
					:key="i"
					@toggle="toggleAnswer"
					:item="faq"
					:number="i + 1"
					:activeId="activeItemId" />
			</ul>
		</Container>
	</Section>
</template>

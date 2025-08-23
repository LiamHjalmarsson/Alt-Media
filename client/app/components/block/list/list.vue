<script setup lang="ts">
import type { ListBlock } from "~/types/blocks";

defineProps<{ block: ListBlock }>();
</script>

<template>
	<Section class="bg-bg-dark text-light">
		<Container>
			<Heading :title="block.title" class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="md:grid-cols-2 relativ">
				<template v-for="(item, i) in block.items" :key="item.id">
					<div v-if="i % 2 === 0" class="flex flex-col w-full justify-end">
						<ListItem :item :number="i + 1" />
					</div>

					<div v-else class="hidden md:block" />

					<div v-if="i % 2 === 1" class="flex w-full justify-start">
						<ListItem :item :number="i + 1" />
					</div>

					<div v-else class="hidden md:block" />
				</template>
			</Grid>

			<div class="mt-2xl py-2xl w-full flex justify-center items-center">
				<Button aria-label="Boka gratis analys"> Gratis analys </Button>
			</div>
		</Container>
	</Section>
</template>

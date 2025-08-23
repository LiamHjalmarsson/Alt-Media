<script setup lang="ts">
import type { SolutionBlock } from "~/types/blocks";

defineProps<{ block: SolutionBlock }>();
</script>

<template>
	<Section>
		<Container>
			<Heading :title="block.title" class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />
			<Grid class="md:grid-cols-2">
				<SolutionItem v-for="solution in block.items" :key="solution.id" :solution="solution" />
			</Grid>
		</Container>
	</Section>
</template>

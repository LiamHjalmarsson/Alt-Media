<script setup lang="ts">
import type { FeaturedServiceBlock } from "~/types/blocks";

defineProps<{ block: FeaturedServiceBlock }>();
</script>

<template>
	<Section>
		<Container>
			<Heading :title="block.title" class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />
			<Grid class="grid-cols-1 md:grid-cols-3">
				<ServiceCard v-for="service in block.services" :key="service.id" :service="service" />
			</Grid>
		</Container>
	</Section>
</template>

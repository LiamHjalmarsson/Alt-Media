<script setup lang="ts">
import type { Solution } from "~/types/shared";

const { solution } = defineProps<{ solution: Solution }>();
</script>

<template>
	<Card>
		<div class="text-center h-full flex flex-col justify-between">
			<Icon v-if="solution.icon.name" :name="solution.icon.name" size="100" class="mx-auto" />
			<div class="my-lg">
				<h3 class="text-heading-md font-semibold mb-lg">
					{{ solution.title }}
				</h3>
				<p class="text-lg">
					{{ solution.description }}
				</p>
			</div>
			<Button variant="ghost" :aria-label="`Läs mer om ${solution.title}`" class="text-sm"> Läs mer </Button>
		</div>
	</Card>
</template>

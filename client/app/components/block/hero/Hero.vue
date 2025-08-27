<script setup lang="ts">
import type { HeroBlock } from "~/types/blocks";

const { block } = defineProps<{ block: HeroBlock }>();
</script>

<template>
	<Section class="bg-dark text-light overflow-hidden relative hero">
		<Container class="flex items-center">
			<div class="flex w-full items-center lg:space-x-2xl">
				<div class="text-center md:text-left space-y-xl max-w-3xl lg:pr-2xl">
					<h1
						class="text-heading-md sm:text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl text-light font-bold tracking-tight leading-tight">
						{{ block.title }}
						<span
							v-if="block.colored_title"
							class="bg-gradient-to-r from-primary via-primary-hover to-primary-active bg-clip-text text-transparent">
							{{ block.colored_title }}
						</span>
					</h1>

					<p
						v-if="block.description"
						class="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl max-sm:text-center">
						{{ block.description }}
					</p>

					<div class="mt-2xl space-y-lg sm:space-x-xl" v-if="block.buttons">
						<template v-for="button in block.buttons">
							<ButtonLink v-if="button.url" :to="button.url" class="max-sm:w-full max-sm:text-center">
								{{ button.label }}
							</ButtonLink>
							<Button v-else variant="primary" class="max-sm:w-full max-sm:text-center">
								{{ button.label }}
							</Button>
						</template>
					</div>
				</div>

				<slot />
			</div>
		</Container>
	</Section>
</template>

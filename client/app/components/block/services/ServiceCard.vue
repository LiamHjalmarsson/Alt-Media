<script setup lang="ts">
import type { Service } from "~/types/collections/services";

const { service } = defineProps<{ service: Service }>();

const slug = computed(() => `/services/${service.slug}`);
</script>

<template>
	<div
		class="h-full relative shadow-lg rounded-2xl group overflow-hidden duration-300 lg:hover:shadow-2xl lg:hover:-translate-y-xs">
		<NuxtLink :to="slug" class="w-full h-full" :aria-label="`Läs mer om ${service.title}`">
			<div class="flex flex-col justify-between relative z-10 p-lg lg:p-xl h-full">
				<IconWrapper class="border-primary bg-primary-disabled/50 shadow-primary/40">
					<NuxtImg v-if="service.icon.has_image" :src="service.icon.image?.url" />
					<Icon v-else :name="service.icon.name" size="40" class="text-primary" />
				</IconWrapper>
				<div>
					<h3 class="font-semibold text-heading-sm md:text-heading-md my-sm md:my-md">
						{{ service.title }}
					</h3>
					<p class="text-sm md:text-md leading-relaxed mb-sm md:mb-md">
						{{ service.description }}
					</p>
				</div>
				<div class="w-full flex justify-end items-end">
					<Button variant="ghost" class="text-sm"> Läs mer </Button>
				</div>
			</div>
			<div
				class="absolute -bottom-6 -left-6 transition transform rounded-full w-4 h-4 group-hover:scale-[70] bg-gradient-to-tr from-indigo-300 via-indigo-300/50 to-indigo-300/70 duration-300"></div>
		</NuxtLink>
	</div>
</template>

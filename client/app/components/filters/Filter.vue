<script setup lang="ts">
import type { Service } from "~/types/collections/services";

const emit = defineEmits(["filterByService"]);

const props = defineProps<{ selected?: string | null; services: Service[] }>();

const selected = computed(() => props.selected ?? null);

function onFilterHandler(title: string) {
	emit("filterByService", title);
}
</script>

<template>
	<Container class="flex justify-center items-center space-x-2xl" size="sm">
		<button
			v-for="service in services"
			:key="service.id"
			@click="onFilterHandler(service.title)"
			:aria-label="`Filtrera efter kategori ${service.title}`"
			:aria-selected="selected === service.title"
			class="flex justify-center items-center flex-col w-fit group cursor-pointer">
			<IconWrapper
				class="border border-primary bg-primary-disabled/50 shadow-lg shadow-primary/40 p-sm w-14 h-14 transition group-hover:bg-primary group-hover:-translate-y-0.5 group-hover:scale-110 duration-300"
				:class="selected === service.title ? 'scale-110' : ''">
				<Icon
					v-if="service.icon?.name"
					:name="service.icon.name"
					size="48"
					class="text-primary group-hover:text-light transition" />
			</IconWrapper>
			<p class="mt-xs text-primary font-semibold first-letter:capitalize">
				{{ service.title }}
			</p>
			<span
				class="mt-xs h-0.5 w-0 bg-primary transition-all duration-300"
				:class="selected === service.title ? 'w-6' : 'w-0'"
				aria-hidden="true" />
		</button>
	</Container>
</template>

<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

const router = useRouter();

const selected = ref<string | null>((route.query.service as string) ?? null);

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(selected.value), { server: true, watch: [selected] });

function onFilterCategory(slug: string) {
	selected.value = selected.value === slug ? null : slug;

	router.push({ query: { service: selected.value || undefined } });
}

watch(
	() => route.query.service,
	(value) => {
		selected.value = (value as string) ?? null;
	}
);
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align-content="center" class="mt-2xl" />

			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />

			<div v-for="(service, i) in services" :key="service.id + i" class="mb-2xl">
				<Grid class="grid-cols-2 mt-lg">
					<Card v-for="sub_service in service.sub_services" :key="sub_service.id" class="p-lg">
						<div class="flex justify-between items-center">
							<h3 class="font-semibold text-heading-sm">{{ sub_service.title }}</h3>
							<div class="flex items-center gap-xs font-semibold text-sm text-dark-gray">
								<span v-for="tag in sub_service.tags" :key="tag.title">
									{{ tag.title }}
								</span>
							</div>
						</div>
						<div v-if="sub_service.content" class="mt-md">
							<StrapiBlocksText :nodes="sub_service.content" />
						</div>
					</Card>
				</Grid>
			</div>
		</Container>
	</Section>
</template>

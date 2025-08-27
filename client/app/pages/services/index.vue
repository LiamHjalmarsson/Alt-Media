<script setup lang="ts">
const serviceStore = useServiceStore();
const route = useRoute();
const router = useRouter();

const selected = ref<string | null>((route.query.service as string) ?? null);

const { services } = storeToRefs(serviceStore);

await useAsyncData("services", () => serviceStore.fetchServices(selected.value), { server: true, watch: [selected] });

watch(
	() => route.query.service,
	(value) => {
		selected.value = (value as string) ?? null;
	}
);

function onFilterCategory(slug: string) {
	selected.value = selected.value === slug ? null : slug;
	router.push({ query: { service: selected.value || undefined } });
}
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align-content="center" class="my-xl" />

			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />

			<div v-for="service in services" :key="service.id" class="mb-2xl">
				<div class="flex items-center justify-between">
					<h2 class="font-semibold text-heading-md tracking-wide leading-relaxed">
						{{ service.title }}
					</h2>

					<NuxtLink :to="{ query: { service: service.slug } }" class="btn"> Visa denna tjänst </NuxtLink>
				</div>

				<Grid class="grid-cols-2 mt-md">
					<div v-for="sub_service in service.sub_services" :key="sub_service.id">
						<h3 class="font-semibold text-heading-2xs">{{ sub_service.title }}</h3>
						<div class="flex items-center gap-xs my-md">
							<span v-for="tag in sub_service.tags" :key="tag.title">
								{{ tag.title }}
							</span>
						</div>
					</div>
				</Grid>
			</div>
		</Container>
	</Section>
</template>

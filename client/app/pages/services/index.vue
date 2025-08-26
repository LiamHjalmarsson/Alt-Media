<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

await serviceStore.fetchServices();

const { services } = storeToRefs(serviceStore);

const selected = ref<string | null>((route.query.service as string) ?? null);

function onFilterCategory(title: string) {}
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align-content="center" class="my-xl" />
			<Filter :services="services" :selected="selected" @filterByService="onFilterCategory" />

			<div v-for="service in services" :key="service.id" class="mb-2xl">
				<h2 class="font-semibold text-heading-md tracking-wide leading-relaxed">
					{{ service.title }}
				</h2>
				<Grid class="grid-cols-2 mt-md">
					<div v-for="sub_service in service.sub_services">
						<h3 class="font-semibold text-heading-2xs">
							{{ sub_service.title }}
						</h3>
						<div class="flex items-center space-x-xs my-md">
							<div v-for="tag in sub_service.tags" :key="tag.title">
								{{ tag.title }}
							</div>
						</div>
					</div>
				</Grid>
			</div>
		</Container>
	</Section>
</template>

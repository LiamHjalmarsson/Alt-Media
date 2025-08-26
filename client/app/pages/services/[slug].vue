<script setup lang="ts">
const serviceStore = useServiceStore();

const route = useRoute();

await useAsyncData("services", () => serviceStore.fetchService(route.params.slug as string), { server: true });
</script>

<template>
	<Section>
		<Container>
			<Heading title="Våra tjänster" align-content="center" class="my-xl" />
		</Container>
	</Section>
</template>

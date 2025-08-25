<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer } = storeToRefs(globalStore);
</script>

<template>
	<footer class="text-light bg-dark pt-2xl">
		<Container>
			<div class="flex w-full max-md:flex-col max-md:space-y-xl justify-between items-center">
				<div>
					<h3
						class="text-light text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-semibold max-lg:text-center">
						{{ footer?.title }}
					</h3>
					<p v-if="footer?.description" class="max-md:mt-xs text-sm sm:text-md md:text-lg lg:text-xl">
						{{ footer.description }}
					</p>
				</div>
				<ButtonLink v-if="footer?.link" :to="footer.link.url" :variant="footer.link.variant">
					{{ footer.link.label }}
				</ButtonLink>
			</div>
		</Container>

		<Container>
			<nav
				aria-label="Footer"
				class="mb-2xl max-md:mt-2xl flex max-md:space-y-lg max-md:flex-col justify-between items-center">
				<div
					v-for="link in footer?.footer_column"
					:key="link.title"
					class="flex flex-col font-heading max-lg:text-center">
					<NuxtLink :to="link.url" class="text-heading-2xs lg:text-headingxs font-semibold">
						{{ link.title }}
					</NuxtLink>

					<ul v-if="link.links?.length" class="mt-sm">
						<li v-for="subLink in link.links" :key="subLink.title" class="mb-sm">
							<NuxtLink :to="subLink.url" class="md:text-sm lg:text-md">
								{{ subLink.title }}
							</NuxtLink>
						</li>
					</ul>
				</div>
			</nav>

			<div class="py-2xl text-center text-xs lg:text-sm text-primary font-semibold">
				© {{ new Date().getFullYear() }} Alt media. Alla rättigheter förbehållna.
			</div>
		</Container>
	</footer>
</template>

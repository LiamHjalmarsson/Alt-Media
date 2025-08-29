<script setup lang="ts">
const globalStore = useGlobalStore();
</script>

<template>
	<Section class="min-h-[80vh]">
		<Container>
			<Grid class="grid-cols-3 gap-2xl">
				<div class="col-span-2 pr-2xl">
					<Heading title="På börja projekt" />

					<form class="mt-lg space-y-lg">
						<Grid class="grid-cols-2" gap="xl">
							<FormField label="Namn" class="text-dark-gray">
								<Input id="" name="" placeholder="" />
							</FormField>
							<FormField label="Email" class="text-dark-gray">
								<Input id="" name="" type="email" placeholder="" />
							</FormField>
						</Grid>

						<FormField label="Brief">
							<Textarea id="" name="" rows="5" placeholder="" />
						</FormField>

						<div class="flex justify-end items-center w-full">
							<Button type="submit">Skicka</Button>
						</div>
					</form>
				</div>

				<div class="flex flex-col justify-start items-center text-center">
					<div>
						<h3 class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-bold">
							Kontakta
						</h3>
						<div class="flex justify-center items-center mt-md gap-xs">
							<Icon name="" />
							<span>{{ globalStore.globalSettings?.phone }}</span>
						</div>
						<div class="flex justify-center items-center mt-md gap-xs">
							<Icon name="" />
							<span>{{ globalStore.globalSettings?.email }}</span>
						</div>
					</div>

					<div class="mt-xl">
						<h3
							class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-semibold mb-md">
							Följ oss
						</h3>
						<div class="flex justify-center items-center gap-md">
							<NuxtLink
								:to="socialMedia.url"
								v-for="socialMedia in globalStore.socialMedias"
								:key="socialMedia.icon_name">
								<IconWrapper class="bg-dark text-light">
									<Icon :name="socialMedia.icon_name" size="40" />
								</IconWrapper>
							</NuxtLink>
						</div>
					</div>
				</div>
			</Grid>
		</Container>
	</Section>
</template>

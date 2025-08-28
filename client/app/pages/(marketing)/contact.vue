<script setup></script>

<template>
	<Section class="min-h-[80vh] bg-bg-dark text-light">
		<Container>
			<Grid class="grid-cols-3">
				<div class="col-span-2 pr-2xl">
					<Heading title="På börja projekt" />

					<form class="mt-lg space-y-lg">
						<Grid class="grid-cols-2" gap="xl">
							<FormField label="Namn">
								<Input id="" name="" placeholder="" />
							</FormField>
							<FormField label="Email">
								<Input id="" name="" type="email" placeholder="" />
							</FormField>
						</Grid>
						<Grid class="grid-cols-2" gap="xl">
							<FormField label="Namn">
								<Input id="" name="" placeholder="" />
							</FormField>
							<FormField label="Email">
								<Input id="" name="" type="email" placeholder="" />
							</FormField>
						</Grid>
						<FormField label="Brief">
							<Textarea id="" name="" rows="" placeholder="" />
						</FormField>
					</form>
				</div>
				<div class="text-center">
					<div>
						<h3
							class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-semibold">
							Kontakta
						</h3>
						<div class="flex justify-center items-center">
							<Icon name="" />
							<span> number</span>
						</div>
						<div class="flex justify-center items-center">
							<Icon name="" />
							<span> email</span>
						</div>
					</div>
					<div class="mt-xl">
						<h3
							class="text-heading-sm sm:text-heading-md md:text-heading-lg lg:text-heading-xl font-semibold mb-md">
							Följ oss
						</h3>
						<div class="flex justify-center items-center">
							<div></div>
						</div>
					</div>
				</div>
			</Grid>
		</Container>
	</Section>
</template>

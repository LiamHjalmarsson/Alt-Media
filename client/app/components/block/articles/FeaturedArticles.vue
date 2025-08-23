<script setup lang="ts">
import type { FeaturedArticleBlock } from "~/types/blocks";

const props = defineProps<{ block: FeaturedArticleBlock }>();

console.log(props.block);
</script>

<template>
	<Section>
		<Container>
			<div class="flex justify-between items-center mb-sm md:mb-md lg:mb-lg xl:mb-xl">
				<Heading :title="block.title" />
				<ButtonLink variant="ghost" to="/articles">
					Alla Artiklar <Icon name="material-symbols:arrow-forward" />
				</ButtonLink>
			</div>

			<Grid class="md:grid-cols-3">
				<ArticleCard v-for="(article, index) in block.articles" :key="article.id + index" :article="article" />
			</Grid>
		</Container>
	</Section>
</template>

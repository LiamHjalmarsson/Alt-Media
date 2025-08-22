<script setup lang="ts">
import type { FeaturedArticleBlock } from "~/types/blocks";

defineProps<{ block: FeaturedArticleBlock }>();
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

			<div class="flex">
				<ArticleCard v-for="(article, index) in block.articles" :key="article.id + index" :article="article" />
			</div>
		</Container>
	</Section>
</template>

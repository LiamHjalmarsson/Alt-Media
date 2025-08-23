import type { Image } from "../shared";
import type { Service } from "./services";
import type { BlockNode } from "#strapi-blocks-renderer/types";

export interface Article {
	id: number;
	title: string;
	slug: string;
	description: string;
	date: Date;
	content: BlockNode[];
	cover: Image;
	services: Service[];
}

export interface FeaturedArticle {
	id: number;
	title: string;
	slug: string;
	description: string;
	date: Date;
	cover: Image;
}

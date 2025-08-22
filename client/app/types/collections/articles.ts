import type { Image } from "../shared";
import type { Service } from "./services";

export interface Article {
	id: number;
	title: string;
	slug: string;
	description: string;
	date: Date;
	content: string;
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

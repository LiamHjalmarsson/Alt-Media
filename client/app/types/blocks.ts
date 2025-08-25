import type { Article } from "./collections/articles";
import type { Project } from "./collections/projects";
import type { Service } from "./collections/services";
import type { AlignContent, Button, Form, Icon, Image, Link, ListItem, Solution } from "./shared";

export interface BaseBlock {
	id: number;
	title: string;
}

export interface InfoBlock extends BaseBlock {
	__component: "block.info";
	align_content: AlignContent;
	button: Button;
	link: Link;
	image: Image;
}

export interface HeroBlock extends BaseBlock {
	__component: "block.hero";
	colored_title: string;
	description: string;
	buttons: Button[];
	links: Link[];
	cover: Image;
	form?: Form;
}

export interface SolutionBlock extends BaseBlock {
	__component: "blocks.solution";
	items: Solution[];
}

export interface FeaturedArticleBlock extends BaseBlock {
	__component: "block.featured";
	articles: Article[];
}

export interface FeaturedServiceBlock extends BaseBlock {
	__component: "block.featured";
	services: Service[];
}

export interface FeaturedProjectBlock extends BaseBlock {
	__component: "block.featured";
	projects: Project[];
	link: Link;
}

export interface ListBlock extends BaseBlock {
	__component: "block.featured";
	items: ListItem[];
	button: Button;
	link: Link;
}

export interface FullSectionBlock extends BaseBlock {
	__component: "block.full-section";
	cover: Image;
	link: Link;
	description: string;
}

export interface FaqBlock extends BaseBlock {
	__component: "block.faq";
	items: ListItem[];
}

export type Blocks =
	| InfoBlock
	| HeroBlock
	| ListBlock
	| FullSectionBlock
	| FaqBlock
	| FeaturedArticleBlock
	| FeaturedProjectBlock
	| FeaturedServiceBlock;

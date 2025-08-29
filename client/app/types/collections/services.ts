import type { Icon } from "../shared";
import type { Tag } from "./tag";
import type { BlockNode } from "#strapi-blocks-renderer/types";

export interface SubService {
	id: number;
	title: string;
	content: BlockNode[];
	tags: Tag[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	icon: Icon;
	sub_services: SubService[];
}

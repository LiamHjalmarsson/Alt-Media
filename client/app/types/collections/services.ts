import type { Icon } from "../shared";
import type { Tag } from "./tag";

export interface SubService {
	id: number;
	title: string;
	content: string;
	tags: Tag[];
}

export interface Service {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: string;
	icon: Icon;
	sub_services: SubService[];
}

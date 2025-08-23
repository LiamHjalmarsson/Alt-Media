import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",

	devtools: { enabled: true },

	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxtjs/strapi",
		"@pinia/nuxt",
		"v-gsap-nuxt",
		"nuxt-strapi-blocks-renderer",
	],

	typescript: {
		typeCheck: true,
	},

	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	image: {
		dir: "public/images",
		strapi: {
			baseURL: process.env.STRAPI_URL || "http://localhost:1337",
		},
	},

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
		{
			path: "~/components/blocks",
			pathPrefix: false,
			global: true,
		},
	],
});


import withNuxt from "./.nuxt/eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";

export default withNuxt({
	files: [
		"app/**/*.{js,ts,vue}",
		"utils/**/*.{js,ts}",
		"types/**/*.{ts}",
		"composables/**/*.{js,ts}",
		"server/**/*.{js,ts}",
	],
	ignores: [],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		parser: tsParser,
		parserOptions: {
			project: [
				"./tsconfig.app.json",
				"./tsconfig.server.json",
				"./tsconfig.shared.json",
				"./tsconfig.node.json",
			],
			extraFileExtensions: [".vue"],
		},
		globals: {
			...globals.browser,
			...globals.node,
			defineNuxtConfig: "readonly",
			definePageMeta: "readonly",
			useAsyncData: "readonly",
			useFetch: "readonly",
			useState: "readonly",
			useRouter: "readonly",
			useRoute: "readonly",
			defineStore: "readonly",
		},
	},
	plugins: {
		"@typescript-eslint": ts,
		"unused-imports": unusedImports,
		vue,
	},
	rules: {
		"unused-imports/no-unused-imports": "error",

		"no-console": ["warn", { allow: ["error", "warn"] }],
		"no-debugger": "error",
		"no-unused-expressions": ["warn", { allowShortCircuit: true, allowTernary: true }],
		"no-mixed-spaces-and-tabs": "error",

		"vue/no-unused-vars": "warn",
		"vue/no-unused-components": ["warn"],
		"vue/order-in-components": [
			"warn",
			{
				order: [
					"el",
					"name",
					"key",
					"parent",
					"functional",
					["delimiters", "comments"],
					"inheritAttrs",
					["components", "directives", "filters"],
					"extends",
					"mixins",
					"model",
				],
			},
		],

		"import/order": [
			"warn",
			{
				"newlines-between": "always",
				alphabetize: { order: "asc", caseInsensitive: true },
				groups: [["builtin", "external"], ["internal", "parent", "sibling", "index", "object"], "type"],
			},
		],

		eqeqeq: ["error", "always"],
		"no-duplicate-imports": "error",
		"no-empty": ["warn", { allowEmptyCatch: true }],
		"no-undef": "off",
		"prefer-const": "warn",
		semi: ["error", "always"],
		quotes: ["warn", "single", { avoidEscape: true }],
		"comma-dangle": ["warn", "always-multiline"],
		"object-curly-spacing": ["warn", "always"],
		"array-bracket-spacing": ["warn", "never"],
		"no-trailing-spaces": "warn",
		"eol-last": ["warn", "always"],
	},
});


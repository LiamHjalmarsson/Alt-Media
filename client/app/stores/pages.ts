export const usePageStore = defineStore("pages", () => {
	const { findOne } = useStrapi();

	async function fetchPage(id: string) {
		const res = await findOne("pages", id);
		console.log(res.data, "Fetch page");
	}

	async function fetchHomePage() {
		const res = await findOne("pages", "home");

		console.log(res.data, "HOMEPAGE");
	}

	return { fetchHomePage, fetchPage };
});

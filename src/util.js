export function createPropertySearchParams({
	sort,
	order,
	maxprice,
	minprice,
}) {
	const params = {
		sort: sort.value,
		order: order.value,
		maxprice: maxprice.value,
		minprice: minprice.value,
	};

	for (const param in params) {
		if (!params[param]) delete params[param];
	}
	return params;
}

export function filterBySearchTerm(properties, search) {
	return properties.filter((property) => {
		if (!search) {
			return true;
		}
		const searchLower = search.toLowerCase();

		const matchesTitle = property.property_name
			.toLowerCase()
			.includes(searchLower);
		const matchesLocation = property.location
			.toLowerCase()
			.includes(searchLower);

		if (matchesTitle || matchesLocation) {
			return true;
		}
		return false;
	});
}

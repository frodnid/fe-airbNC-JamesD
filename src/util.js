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

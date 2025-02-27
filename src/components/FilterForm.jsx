import { createPropertySearchParams } from "../util";

export default function FilterForm({ setParams }) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const filterParams = createPropertySearchParams(
					e.target.elements
				);
				setParams(filterParams);
			}}
		>
			<h5>Sort By:</h5>
			<label htmlFor="popularity">Popularity</label>
			<input
				type="radio"
				id="popularity"
				name="sort"
				value="popularity"
			/>
			<label htmlFor="price_per_night">Price per Night</label>
			<input
				type="radio"
				id="price_per_night"
				name="sort"
				value="price_per_night"
			/>
			<h5>Order:</h5>
			<label htmlFor="asc">Ascending</label>
			<input type="radio" id="asc" name="order" value="asc" />
			<label htmlFor="desc">Descending</label>
			<input type="radio" id="desc" name="order" value="desc" />
			<br />
			<label htmlFor="maxprice">Max Price per Night</label>
			<input type="number" name="maxprice" id="maxprice" />
			<br />
			<label htmlFor="minprice">Min Price per Night</label>
			<input type="number" name="minprice" id="minprice" />
			<input type="submit" />
		</form>
	);
}

import { useEffect, useState } from "react";
import { getProperties } from "../api";
import { createPropertySearchParams } from "../util";
import PropertyCard from "./PropertyCard";
import { CButton, CCollapse } from "@coreui/react";

export default function Feed() {
	const [properties, setProperties] = useState(null);
	const [params, setParams] = useState(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		getProperties(params)
			.then((propertyArr) => {
				setProperties(propertyArr);
			})
			.catch(() => {
				console.log("ERROR");
			});
	}, [params]);

	if (properties === null) {
		return <div>Loading!</div>;
	}

	return (
		<>
			<CButton color="primary" onClick={() => setVisible(!visible)}>
				Filters
			</CButton>
			<CCollapse visible={visible}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const filterParams = createPropertySearchParams(
							e.target.elements
						);
						setParams(filterParams);
					}}
				>
					<h4>Filters:</h4>
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
			</CCollapse>

			<ul id="property-feed-main">
				{properties.map((property) => {
					return (
						<PropertyCard
							key={property.property_id}
							id={property.property_id}
							name={property.property_name}
							location={property.location}
							price={property.price_per_night}
							image={property.image}
						/>
					);
				})}
			</ul>
		</>
	);
}

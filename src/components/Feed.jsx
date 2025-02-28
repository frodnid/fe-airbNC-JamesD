import { useContext, useEffect, useState } from "react";
import { getProperties } from "../api";
import { filterBySearchTerm } from "../util";
import PropertyCard from "./PropertyCard";
import { CButton, CCollapse } from "@coreui/react";
import { SearchContext } from "../contexts/Context";
import FilterForm from "./FilterForm";

export default function Feed() {
	const { search } = useContext(SearchContext);

	const [properties, setProperties] = useState(null);
	const [params, setParams] = useState(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		getProperties(params)
			.then((propertyArr) => {
				setProperties(filterBySearchTerm(propertyArr, search));
			})
			.catch(() => {
				console.log("ERROR");
			});
	}, [params, search]);

	if (properties === null) {
		return <div>Loading!</div>;
	}

	return (
		<>
			<CButton color="primary" onClick={() => setVisible(!visible)}>
				{visible ? "Hide Filters" : "Show Filters"}
			</CButton>
			<CCollapse visible={visible}>
				<FilterForm setParams={setParams} />
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

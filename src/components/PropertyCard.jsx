import { Link } from "react-router";

export default function PropertyCard({ id, name, location, price, image }) {
	return (
		<div
			className="property-card"
			style={{
				backgroundImage: `url(${image})`,
			}}
		>
			<div className="card-overlay">
				<h3 className="property-card-title">{name}</h3>
				<span className="property-card-location">{location}</span>
				<span className="property-card-price">£{price}</span>
				<Link to={`/properties/${id}`}>
					<button className="property-card-button">
						View Property
					</button>
				</Link>
			</div>
		</div>
	);
}

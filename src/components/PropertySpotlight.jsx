import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import * as api from "../api";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import ReviewList from "./ReviewList";

export default function PropertySpotlight() {
	const { id } = useParams();
	const [propertyData, setPropertyData] = useState(null);
	const imgIndex = useRef(0);

	useEffect(() => {
		api.getProperty(id).then((data) => {
			setPropertyData(data);
		});
	}, []);
	if (propertyData === null) return <div>Loading...</div>;

	const {
		property_name: name,
		location,
		price_per_night: price,
		description,
		host,
		host_avatar: hostImg,
		favourite_count: favCount,
		images,
	} = propertyData;

	return (
		<div id="property-spotlight">
			<h2>{name}</h2>
			<span>{price}</span>
			<span>{location}</span>
			<p>{description}</p>
			<CCarousel controls indicators dark interval="false">
				{images.map((image) => {
					return (
						<CCarouselItem key={imgIndex.current++}>
							<CImage
								className="d-block w-100"
								src={image}
								alt={`slide-${imgIndex.current}`}
							/>
						</CCarouselItem>
					);
				})}
			</CCarousel>
			<ReviewList id={id} />
		</div>
	);
}

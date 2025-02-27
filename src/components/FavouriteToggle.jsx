import { useContext, useState, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import * as api from "../api";
import { CButton, CSpinner } from "@coreui/react";

export default function FavouriteToggle({ propertyID, userID, favourited }) {
	const id = useRef(null);
	const [isFavourite, setIsFavourite] = useState(favourited);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const { favourites } = useContext(UserContext);

	if (!isFavourite) {
		return (
			<CButton
				color="secondary"
				disabled={buttonDisabled}
				onClick={() => {
					setButtonDisabled(true);
					api.postFavourite(propertyID, userID).then(
						(favouriteID) => {
							setIsFavourite(true);
							favourites.current.push({
								favourite_id: Number(favouriteID),
								property_id: Number(propertyID),
							});
							id.current = favouriteID;
							setButtonDisabled(false);
						}
					);
				}}
			>
				<CSpinner
					hidden={!buttonDisabled}
					as="span"
					size="sm"
					aria-hidden="true"
				/>
				<span>Add to Favourites</span>
				<img
					onLoad={() => {}}
					src="src/assets/heart-icon-grey.webp"
					alt="grey heart icon"
				/>
			</CButton>
		);
	}

	return (
		<CButton
			color="secondary"
			disabled={buttonDisabled}
			onClick={() => {
				setButtonDisabled(true);
				if (!id.current) {
					id.current = favourites.current.find((favourite) => {
						return favourite.property_id === Number(propertyID);
					}).favourite_id;
				}
				api.deleteFavourite(id.current).then(() => {
					setIsFavourite(false);
					favourites.current = favourites.current.filter(
						(favourite) => {
							return favourite.favourite_id !== id.current;
						}
					);
					setButtonDisabled(false);
				});
			}}
		>
			<CSpinner
				hidden={!buttonDisabled}
				as="span"
				size="sm"
				aria-hidden="true"
			/>
			<span>Remove from Favourites</span>
			<img
				src="src/assets/heart-icon-black.webp"
				alt="black heart icon"
			/>
		</CButton>
	);
}

import { CButton, CSpinner } from "@coreui/react";
import { useContext, useRef, useState } from "react";
import * as api from "../api";
import heartBlack from "../assets/heart-icon-black.webp";
import heartGrey from "../assets/heart-icon-grey.webp";
import { UserContext } from "../contexts/Context";

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
					width="2rem"
					aria-hidden="true"
				/>

				<img
					src={heartGrey}
					alt="grey heart icon"
					style={{
						display: buttonDisabled ? "none" : "block",
						width: "2rem",
					}}
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
				size="2rem"
				aria-hidden="true"
			/>
			<img
				src={heartBlack}
				alt="black heart icon"
				style={{
					display: buttonDisabled ? "none" : "block",
					width: "2rem",
				}}
			/>
		</CButton>
	);
}

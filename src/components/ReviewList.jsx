import { useState, useEffect, useContext } from "react";
import * as api from "../api";
import { CCard, CCardBody, CCardSubtitle, CCardTitle } from "@coreui/react";
import { UserContext } from "../contexts/UserContext";

export default function ReviewList({ id }) {
	const { user } = useContext(UserContext);
	const [reviews, setReviews] = useState(null);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [comment, setComment] = useState("");
	const starValues = [1, 2, 3, 4, 5];
	useEffect(() => {
		api.getReviews(id).then((reviewsData) => {
			setReviews(reviewsData);
		});
	}, []);

	if (reviews === null) return <div>Loading...</div>;

	return (
		<>
			<h3>Reviews:</h3>
			<p>average rating: {reviews.average_rating} stars</p>

			{reviews.reviews.map((review) => {
				return (
					<CCard
						key={review.review_id}
						style={{
							width: "18rem",
							padding: "1rem",
							marginBottom: "1rem",
						}}
					>
						<CCardTitle>{review.rating} Stars</CCardTitle>
						<CCardSubtitle>{review.guest}</CCardSubtitle>
						<CCardBody style={{ fontStyle: "italic" }}>
							{review.comment}
						</CCardBody>
					</CCard>
				);
			})}

			<form
				id="review-form"
				onSubmit={(e) => {
					e.preventDefault();
					const ratingObj = {
						guest_id: user.user_id,
						rating,
						comment,
					};
					api.postReview(id, ratingObj).then(() => {
						console.log("done!");
					});
				}}
			>
				<h5>Rating:</h5>
				<div id="star-rating-select">
					{starValues.map((starValue) => {
						return (
							<span
								key={starValue}
								style={{
									cursor: "pointer",
									fontSize: "2rem",
									color:
										starValue <= (hover || rating)
											? "gold"
											: "lightgray",
								}}
								onClick={() => setRating(starValue)}
								onMouseEnter={() => setHover(starValue)}
								onMouseLeave={() => setHover(0)}
							>
								&#9733;
							</span>
						);
					})}
				</div>
				<h5>Comment:</h5>
				<textarea
					name="comment-box"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					rows="4"
					cols="40"
					placeholder="Enter your comment here..."
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

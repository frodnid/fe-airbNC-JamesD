import { useState, useEffect } from "react";
import { getReviews } from "../api";

export default function ReviewList({ id }) {
	const [reviews, setReviews] = useState(null);

	useEffect(() => {
		getReviews(id).then((reviewsData) => {
			setReviews(reviewsData);
		});
	}, []);

	if (reviews === null) return <div>Loading...</div>;
	console.log(reviews);
	return (
		<>
			<p>average rating: {reviews.average_rating}</p>

			{reviews.reviews.map((review) => {
				return (
					<p key={review.review_id}>
						{review.comment} {review.guest} {review.rating}
					</p>
				);
			})}
		</>
	);
}

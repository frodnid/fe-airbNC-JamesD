export default function StarDisplay({ review }) {
	return (
		<span>
			{[1, 2, 3, 4, 5].map((starValue) => {
				return (
					<span
						key={`${review.review_id}-stars-${starValue}`}
						style={{
							fontSize: "2rem",
							color:
								starValue <= review.rating
									? "gold"
									: "lightgray",
						}}
					>
						&#9733;
					</span>
				);
			})}
		</span>
	);
}

export function addReview(review) {
  return {
    type: 'ADD_REVIEW',
    payload: review,
  };
}

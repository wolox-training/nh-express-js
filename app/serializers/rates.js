exports.serializeRate = rate => ({
  id: rate.id,
  rating_user_id: rate.rating_user_id,
  weet_id: rate.weet_id,
  score: rate.score,
  updated_at: rate.updatedAt
});

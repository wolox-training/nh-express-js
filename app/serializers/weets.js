exports.serializeWeet = weet => ({
  id: weet.id,
  content: weet.content,
  user_id: weet.user_id,
  created_at: weet.createdAt
});

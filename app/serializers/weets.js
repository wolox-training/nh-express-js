exports.serializeWeet = weet => ({
  id: weet.id,
  content: weet.content,
  weet_id: weet.weet_id,
  score: weet.score
});

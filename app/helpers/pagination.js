const pagination = (model, per_page, page) =>
  model.findAll({ offset: (page - 1) * per_page, limit: per_page });

module.exports = {
  pagination
};

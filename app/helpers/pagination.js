exports.pagination = (model, per_page = 25, page = 1) =>
  model.findAll({ offset: (page - 1) * per_page, limit: per_page });
